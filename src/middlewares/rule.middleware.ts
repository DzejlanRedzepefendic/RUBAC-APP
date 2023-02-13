import { Request, Response, NextFunction } from 'express';
import { convertIpv6ToIpv4, isIpInRange } from '../utils';
import { AppError } from './error.middleware';

type RoleRequest = Request & { query: { role: string } };

export const checkRole = (allowedRoles: string | string[]) => {
  return (request: RoleRequest, _response: Response, next: NextFunction) => {
    const clientRole = request.query.role;

    if (
      allowedRoles === clientRole ||
      (Array.isArray(allowedRoles) && allowedRoles.includes(clientRole))
    ) {
      return next();
    }

    throw new AppError(
      403,
      'Forbidden Route: Access to this route is restricted.'
    );
  };
};

export const checkIpAddress = (allowedIpAddress: string) => {
  return (request: Request) => {
    let clientIp = process.env.NODE_ENV
      ? (request.header('x-forwarded-for') as string)
      : request.ip;

    const hasIpv4Format =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // check if IPv4-mapped IPv6 addresse format
    if (!hasIpv4Format.test(clientIp)) {
      clientIp = convertIpv6ToIpv4(clientIp);
    }

    // Expand compressed IP addresses in local environment by concatenating with "172.0.0.X".
    if (clientIp.length === 1) clientIp = '127.0.0.' + clientIp;

    if (
      allowedIpAddress.includes('/')
        ? isIpInRange(clientIp, allowedIpAddress)
        : allowedIpAddress === clientIp
    ) {
      return;
    }

    throw new AppError(
      403,
      'Forbidden Route: Access to this route is restricted.'
    );
  };
};

export const RBAC = (
  protectedPath: string,
  allowedIpAddress: string,
  allowedRoles: string | string[]
) => {
  return (request: RoleRequest, response: Response, next: NextFunction) => {
    if (!request.url.includes(protectedPath)) return next();
    checkIpAddress(allowedIpAddress)(request);
    checkRole(allowedRoles)(request, response, next);
  };
};

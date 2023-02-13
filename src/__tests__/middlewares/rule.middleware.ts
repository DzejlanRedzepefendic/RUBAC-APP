import request from 'supertest';
import app from '../../index';

describe('GET /admin/users endpoint', () => {
  const path = '/admin/users';
  const query = '?role=';

  const ipAddresses = {
    allowed: ['100.100.100.100', '100.100.100.110'],
    disallowed: ['100.100.100.112', '55.5.33.3'],
  };
  const users = {
    allowed: { ADMIN: 'ADMIN', SUPER_ADMIN: 'SUPER_ADMIN' },
    disallowed: { USER: 'USER' },
  };

  it('"Access granted" with 200 status code when accessed with ADMIN role and valid ip', async () => {
    const res = await request(app)
      .get(path + query + users.allowed.ADMIN)
      .set('x-forwarded-for', ipAddresses.allowed[0]);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Access granted');
  });

  it('"Access granted" with 200 status code when accessed with SUPER_ADMIN role and valid ip', async () => {
    const res = await request(app)
      .get(path + query + users.allowed.SUPER_ADMIN)
      .set('x-forwarded-for', ipAddresses.allowed[0]);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Access granted');
  });

  it('"Access granted" with 200 status code when accessed with ADMIN and 100.100.100.110 ', async () => {
    const res = await request(app)
      .get(path + query + users.allowed.ADMIN)
      .set('x-forwarded-for', ipAddresses.allowed[1]);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Access granted');
  });

  it('"Forbidden Route: Access to this route is restricted." with 403 status code when accessed with ADMIN and 100.100.100.112', async () => {
    const res = await request(app)
      .get(path + query + users.allowed.ADMIN)
      .set('x-forwarded-for', ipAddresses.disallowed[0]);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      'Forbidden Route: Access to this route is restricted.'
    );
  });

  it('"Forbidden Route: Access to this route is restricted." with 403 status code when accessed without proper credentials', async () => {
    const res = await request(app)
      .get(path)
      .set('x-forwarded-for', ipAddresses.allowed[0]);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      'Forbidden Route: Access to this route is restricted.'
    );
  });
  it('"Forbidden Route: Access to this route is restricted." with 403 status code when accessed with USER role', async () => {
    const res = await request(app)
      .get(path + query + users.disallowed.USER)
      .set('x-forwarded-for', ipAddresses.allowed[0]);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      'Forbidden Route: Access to this route is restricted.'
    );
  });
});

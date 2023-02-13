function dot2int(dot: string) {
  const d = dot.split('.');
  return ((+d[0] * 256 + +d[1]) * 256 + +d[2]) * 256 + +d[3];
}

export function isIpInRange(ip: string, network: string) {
  const [address, mask] = network.split('/');
  const intIp = dot2int(ip);
  const intNetwork = dot2int(address) & (0xffffffff << (32 - +mask));
  const intBroadcast = intNetwork + (1 << (32 - +mask)) - 1;

  return intIp >= intNetwork && intIp <= intBroadcast;
}

export function convertIpv6ToIpv4(hybridIPv4IPv6: string) {
  const IPFromRequest = hybridIPv4IPv6;
  const indexOfColon = IPFromRequest!.lastIndexOf(':');

  return IPFromRequest!.substring(indexOfColon + 1, IPFromRequest!.length);
}

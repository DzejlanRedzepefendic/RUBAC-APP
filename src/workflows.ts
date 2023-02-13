export const workflows = [
  {
    workflowID: 1,
    rules: {
      path: '/admin',
      ip: '100.100.100.100',
      roles: 'ADMIN',
    },
  },
  {
    workflowID: 2,
    rules: {
      path: '/admin',
      ip: '100.100.100.100/28',
      roles: ['ADMIN', 'SUPER_ADMIN'],
    },
  },
];

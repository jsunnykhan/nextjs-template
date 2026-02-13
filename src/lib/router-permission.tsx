export const routerPermission: RoutePermission[] = [
  {
    label: 'Dashboard',
    // icon: <HiHome />,
    url: '/',
    global: true,
  },
  {
    label: 'Users',
    // icon: <FaUserGroup />,
    url: '/users',
    permission: [],
  },
];

import { HiHome } from 'react-icons/hi2';
import { FaUserGroup } from 'react-icons/fa6';
import { permissions } from './permission-manager';

export const routerPermission: RoutePermission[] = [
  {
    label: 'Dashboard',
    icon: <HiHome />,
    url: '/',
    global: true,
  },
  {
    label: 'Users',
    icon: <FaUserGroup />,
    url: '/users',
    permission: [permissions.getUserInfo],
  },
];

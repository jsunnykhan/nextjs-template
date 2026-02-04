'use client';

import { routerPermission } from '@/lib/router-permission';
import Link from 'next/link';

const renderSidebarItem = (route: RoutePermission) => (
  <li key={route.url}>
    <Link
      href={route.url}
      className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
    >
      <div className="flex gap-2 items-center">
        {route.icon}
        {route.label}
      </div>
    </Link>
  </li>
);

const Sidebar = () => {
  
  return (
    <aside className="min-w-[15%] h-screen bg-gray-100 text-gray-800 p-6 border-r border-gray-200">
      <div className="text-2xl font-bold tracking-wide text-gray-800">Logo</div>
      <ul className="space-y-4 mt-16">
        {routerPermission.map((route) => {
          if (route?.global) return renderSidebarItem(route);
          // if (hasPermission(route.permission)) return renderSidebarItem(route);
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;

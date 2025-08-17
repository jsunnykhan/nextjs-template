import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import React from 'react';

const AuthenticatedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;

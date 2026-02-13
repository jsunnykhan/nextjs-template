import { AppSidebar } from '@/components/app-sidebar';
import SidebarHeader from '@/components/sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const AuthenticatedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
        <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='!overflow-hidden max-h-dvh'>
        
         <SidebarHeader/>
         <main className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4">
           {children}
         </main>
    
      </SidebarInset>
    </SidebarProvider>
        
     
    
  );
};

export default AuthenticatedLayout;

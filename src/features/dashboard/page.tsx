'use client';

import { logoutAction } from '@/actions/logout';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const { data } = useSession();

  const handleSigninOut = async () => {
    await logoutAction();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleSigninOut}>logout</button>
    </div>
  );
};

export default DashboardPage;

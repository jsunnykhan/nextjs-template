'use client';

import { logoutAction } from '@/actions/logout';

const DashboardPage = () => {


  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logoutAction}>logout</button>
    </div>
  );
};

export default DashboardPage;

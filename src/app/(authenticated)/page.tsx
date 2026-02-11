import DashboardPage from '@/features/dashboard/page';
import { Metadata } from 'next';
import {withAuth} from '../auth/withAuth';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

function Home() {
  return <DashboardPage />;
}

export default withAuth(Home)
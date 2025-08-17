import DashboardPage from '@/features/dashboard/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function Home() {
  return <DashboardPage />;
}

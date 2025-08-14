import LoginPage from '@/features/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Page',
};

const page = () => {
  return <LoginPage />;
};

export default page;

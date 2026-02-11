import LoginPage from '@/features/auth/login';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Page',
};

const page = async() => {
  const session = await auth.api.getSession({headers:await headers()})

  if (session){
    redirect("/")
  }

  return <main className='flex min-h-svh items-center justify-center p-6 md:p-10'>
    <LoginPage />
  </main>;
};

export default page;

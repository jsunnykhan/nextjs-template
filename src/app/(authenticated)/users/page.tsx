import UserList from '@/features/users/user-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Users',
};

const page = () => {
  return (
    <>
      <UserList />
    </>
  );
};

export default page;

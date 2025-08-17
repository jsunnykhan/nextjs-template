import { useSession } from 'next-auth/react';

export const permissions = {
  // user
  getUserInfo: 'GET|/users',
  createUser: 'POST|/users',
  updateUser: 'PUT|/user/{user_id}',
  deleteUser: 'DELETE|/users/{user_id}',
};

export function usePermission() {
  const { data: session } = useSession();

  const ProfilePermissions = session?.user?.permissions || [];

  const hasPermission = (p: string | string[] | undefined) => {
    if (!p) return false;
    if (Array.isArray(p)) {
      return p.some((permission) => ProfilePermissions.includes(permission));
    }
    return ProfilePermissions.includes(p);
  };

  return { hasPermission };
}

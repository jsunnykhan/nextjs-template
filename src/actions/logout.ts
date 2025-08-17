'use server';

import { signOut } from '@/auth'; // or 'next-auth/react' if client-side

export async function logoutAction() {
  try {
    return await signOut();
  } catch (error) {
    throw error;
  }
}

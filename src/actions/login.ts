'use server';

'use server';

import { signIn } from '@/auth'; // or 'next-auth/react' if client-side
import { LoginFormInputs } from '@/features/auth/login';
import { AuthError } from 'next-auth';

export async function loginAction(data: LoginFormInputs) {
  try {
    return await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid credentials' };
    }
    return { error: 'Unexpected error' };
  }
}

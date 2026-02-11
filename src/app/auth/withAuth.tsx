import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ComponentType } from 'react'

export function withAuth<P extends object>(
  Component: ComponentType<P>
) {
  return async function AuthenticatedComponent(props: P) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
      redirect('/auth/login')
    }

    return <Component {...props} />
  }
}

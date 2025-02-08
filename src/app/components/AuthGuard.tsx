'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname, redirect } from 'next/navigation'
import { isLoggedIn } from '@/app/api/auth/auth'
import SignInButton from './SignInButton'
import Loading from './Loading'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [verified, setVerified] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await isLoggedIn()

      if (!isAuthenticated && pathname !== '/') {
        router.push('/')
      } else {
        setVerified(isAuthenticated)
      }
      setChecking(false)
    }

    verifyAuth()
  }, [pathname, router])

  if (checking) {
    return <Loading />// loading component
  }

  // If not verified and not on home page, show nothing (will redirect)
  if (!verified && pathname !== '/') {
    return null
  }

  // If not verified and on home page, return to home page
  if (!verified && pathname === '/') {
    return redirect("/")
  }

  // If verified, show the protected content
  return <>{children}</>
}

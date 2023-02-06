'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

const LoginContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined)

export function LoginProvider({ children }: { children: ReactNode }) {
  const loginState = useState(true)
  return (
    <LoginContext.Provider value={loginState}>
      {children}
    </LoginContext.Provider>
  )
}

export function useLogin() {
  const context = useContext(LoginContext)
  if (context === undefined) {
    throw new Error(
      'useLogin must be used within a LoginContext Provider')
  }
  return context
}

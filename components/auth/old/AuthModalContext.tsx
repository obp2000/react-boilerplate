'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

const AuthModalContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined)

export default function AuthModalProvider({
  children
}: { children: ReactNode }) {
  const modalState = useState(false)
  return (
    <AuthModalContext.Provider value={modalState}>
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  const context = useContext(AuthModalContext)
  if (context === undefined) {
    throw new Error(
      'useAuthModal must be used within an AuthModalContext Provider')
  }
  return context
}

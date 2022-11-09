'use client'

import React from 'react'
import type { MainContextType } from '@/interfaces/options'
import type { AuthModalContextType } from '@/interfaces/auth'
import type { ObjectsContextType } from '@/interfaces/api'

// export const defaultOptionsContext: Partial<OptionsOueryResult> = {
//   options: undefined,
//   commonConsts: undefined,
// }

// export const OptionsContext = React.createContext(defaultOptionsContext)

export const defaultMainContext: Partial<MainContextType> = {
  accessToken: null,
  isAuthenticated: undefined,
  options: undefined,
  commonConsts: undefined,
  user: undefined,
  indexUrl: undefined,
}

export const MainContext = React.createContext(defaultMainContext)

export const defaultAuthModalContext: AuthModalContextType = {
  isLoginState: [true, () => null],
  modalState: [false, () => null]
}

export const AuthModalContext = React.createContext(defaultAuthModalContext)

export const defaultObjectsContext: ObjectsContextType = {
  totalCount: undefined,
  totalPages: undefined,
  results: undefined,
  object: undefined
}

export const ObjectsContext = React.createContext(defaultObjectsContext)

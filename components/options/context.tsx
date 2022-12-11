'use client'

import type { MainContextType } from '@/interfaces/options'
import React from 'react'

export const defaultMainContext: Partial<MainContextType> = {
	options: undefined,
	commonConsts: undefined,
}

export const MainContext = React.createContext(defaultMainContext)

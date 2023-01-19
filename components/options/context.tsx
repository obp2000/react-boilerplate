'use client'

import type { AnyOptionsType } from '@/interfaces/options'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

export const defaultMainContext = {
	options: undefined,
}

export const MainContext = createContext<(AnyOptionsType) | undefined>(defaultMainContext)

export function MainContextProvider({
	children,
	options
}: AnyOptionsType & { children: ReactNode }) {
	return <MainContext.Provider value={{ options }}>
		{children}
	</MainContext.Provider>
}

export function useOptions() {
	const context = useContext(MainContext)
	if (context === undefined) {
		throw new Error(
			'useOptions must be used within a MainContext Provider')
	}
	return context
}

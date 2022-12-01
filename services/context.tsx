'use client'

import React, { FC, useState } from 'react'
import type { AuthContextType, MainContextType } from '@/interfaces/options'
import type { AuthModalContextType } from '@/interfaces/auth'
import type { AnyObjectType, ObjectsContextType, ObjectsWithTotals } from '@/interfaces/api'
import type { Children } from '@/interfaces/layout'

export const defaultAuthContext: Partial<AuthContextType> = {
	accessToken: null,
	isAuthenticated: undefined,
	user: undefined,
}

export const AuthContext = React.createContext(defaultAuthContext)

export const defaultMainContext: Partial<MainContextType> = {
	options: undefined,
	commonConsts: undefined,
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


export const MainProvider: FC<MainContextType> = ({
	children,
	...mainContext
}) => <MainContext.Provider value={mainContext}>
		{children}
	</MainContext.Provider>



'use client'

import AuthModal from '@/auth/AuthModal'
import { AuthModalContext } from '@/services/context'
import type { MainContextType } from '@/interfaces/options'
import NavBar from '@/navBar/NavBar'
import { MainContext } from '@/services/context'
import { FC, useState } from 'react'
import { ToastContainer } from 'react-toastify'
// import { mainContext as test1 } from '@/services/api/server'

const HeaderContainer: FC<MainContextType> = (mainContext) => {
	const { isAuthenticated } = mainContext
	const isLoginState = useState(true)
	const modalState = useState(false)
	return <MainContext.Provider value={mainContext}>
		<AuthModalContext.Provider value={{ isLoginState, modalState }}>
			<NavBar />
			{!isAuthenticated && <AuthModal />}
			<ToastContainer />
		</AuthModalContext.Provider>
	</MainContext.Provider>
}

export default HeaderContainer

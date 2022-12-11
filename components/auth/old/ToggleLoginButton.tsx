'use client'

import Button from '@/client/Button'
import { MainContext } from '@/options/context'
import { SetStateAction, useContext } from 'react'

export default function ToggleLoginButton({
	isLogin,
	setIsLogin,
}: {
	isLogin: boolean,
	setIsLogin: (value: SetStateAction<boolean>) => void
}) {
	const { commonConsts } = useContext(MainContext)
	return <Button
		size='sm'
		variant='outline-primary'
		onClick={() => setIsLogin(!isLogin)}
	>
		{isLogin ? commonConsts?.register : commonConsts?.login}
	</Button>
}

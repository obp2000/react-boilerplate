'use client'

import Button from '@/client/Button'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { SetStateAction } from 'react'

export default function ToggleLoginButton({
	isLogin,
	setIsLogin,
	commonConsts
}: {isLogin: boolean,
	setIsLogin: (value: SetStateAction<boolean>) => void } & CommonConstsType) {
	// const { commonConsts } = useContext(MainContext)
	return <Button size='sm' outline onClick={() => setIsLogin(!isLogin)}>
		{isLogin ? commonConsts?.register : commonConsts?.login}
	</Button>
}

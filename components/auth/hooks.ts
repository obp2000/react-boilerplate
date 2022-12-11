import { LoginFormValues, RegisterFormValues } from "@/interfaces/auth"
import { CommonConstsType } from '@/interfaces/commonConsts'
import { UserType } from "@/interfaces/users"
import { MainContext } from '@/options/context'
import { validate } from "@/validators/validators"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { authAction, signOutAction } from './client'
import { loginFormConfig, registerFormConfig } from "./config"

export function useForm({ isLogin }: { isLogin: boolean }) {
	const { commonConsts } = useContext(MainContext)
	const {
		indexUrl,
		name,
		validatedFields,
	} = isLogin ? loginFormConfig : registerFormConfig
	const { refresh, replace } = useRouter()
	const onSubmit = (values: LoginFormValues | RegisterFormValues) =>
		authAction({ values, url: indexUrl, refresh, replace })
	return {
		name,
		validate: validate({
			errorMessages: commonConsts?.error_messages,
			validatedFields
		}),
		onSubmit
	}
}

export function useSignOutButton({
	commonConsts,
	user
}: CommonConstsType & UserType) {
	const { refresh } = useRouter()
	let label = commonConsts?.logout_menu_item.label
	if (user) {
		label += ` (${user?.username})`
	}
	return {
		variant: 'outline-light',
		'aria-label': 'auth',
		onClick: () => signOutAction(refresh),
		children: label
	}
}

export function useToggleModalButton() {
	const { commonConsts } = useContext(MainContext)
	return {
		variant: 'outline-light',
		'aria-label': 'auth',
		children: commonConsts?.login_menu_item.label
	}
}

export function useToggleLoginButton({ isLogin }: { isLogin: boolean }) {
	const { commonConsts } = useContext(MainContext)
	const size = 'sm' as 'sm' | 'lg' | undefined
	return {
		size,
		variant: 'outline-primary',
		children: isLogin ? commonConsts?.register : commonConsts?.login
	}
}

export function useSubmitButtom({ isLogin }: { isLogin: boolean }) {
	const { commonConsts } = useContext(MainContext)
	return {
		children: isLogin ? commonConsts?.login : commonConsts?.register
	}
}

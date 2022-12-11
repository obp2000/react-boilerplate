import { AnyObjectType, IdParam } from "@/interfaces/api"
import { AccessToken } from "@/interfaces/auth"
import { CommonConstsType } from "@/interfaces/commonConsts"
import { Customer } from "@/interfaces/customers"
import { mutateObject } from "@/objectForm/client"
import { validate } from "@/validators/validators"
import { useRouter, usePathname } from "next/navigation"
import { modFormValues, validatedFields } from './config'

export function useForm({
	commonConsts,
	...props
}: IdParam & CommonConstsType & Required<AccessToken>) {
	// console.log('usePathname in useForm ', usePathname().split('/')[1])
	const indexUrl = `/${(usePathname() ?? '').split('/')[1]}/`
	const { refresh, push } = useRouter()
	const onSubmit = (values: AnyObjectType) => mutateObject({
		modValues: modFormValues(values as Customer),
		indexUrl,
		commonConsts,
		refresh,
		push,
		...props
	})
	return {
		name: 'objectForm',
		validate: validate({
			errorMessages: commonConsts?.error_messages,
			validatedFields
		}),
		onSubmit
	}
}

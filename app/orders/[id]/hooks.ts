import { AnyObjectType, IdParam } from "@/interfaces/api"
import { AccessToken } from "@/interfaces/auth"
import { CommonConstsType } from "@/interfaces/commonConsts"
import { Order } from "@/interfaces/orders"
import { mutateObject } from "@/objectForm/client"
import { validate } from "@/validators/validators"
import { usePathname, useRouter } from "next/navigation"
import { decorators, modFormValues, mutators, validatedFields } from './config'

export function useForm({
	commonConsts,
	...props
}: IdParam & CommonConstsType & Required<AccessToken>) {
	const indexUrl = `/${(usePathname() ?? '').split('/')[1]}/`
	const { refresh, push } = useRouter()
	const onSubmit = (values: AnyObjectType) => mutateObject({
		modValues: modFormValues(values as Order),
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
		decorators,
		mutators,
		onSubmit
	}
}


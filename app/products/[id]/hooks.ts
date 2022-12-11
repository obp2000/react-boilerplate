import { AnyObjectType, IdParam } from "@/interfaces/api"
import { AccessToken } from "@/interfaces/auth"
import { CommonConstsType } from "@/interfaces/commonConsts"
import { Product } from "@/interfaces/products"
import { mutateObject } from "@/objectForm/client"
import { validate } from "@/validators/validators"
import { usePathname, useRouter } from "next/navigation"
import { modFormValues, validatedFields, decorators } from './config'

export function useForm({
	commonConsts,
	...props
}: IdParam & CommonConstsType & Required<AccessToken>) {
	const indexUrl = `/${(usePathname() ?? '').split('/')[1]}/`
	const { refresh, push } = useRouter()
	const onSubmit = (values: AnyObjectType) => mutateObject({
		modValues: modFormValues(values as Product),
		indexUrl,
		commonConsts,
		refresh,
		push,
		contentType: 'multipart/form-data',
		...props
	})
	return {
		name: 'objectForm',
		validate: validate({
			errorMessages: commonConsts?.error_messages,
			validatedFields
		}),
		decorators,
		onSubmit
	}
}

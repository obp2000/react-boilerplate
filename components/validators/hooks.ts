import { ValidatedFields } from "@/interfaces/index"
import { MainContext } from "@/services/context"
import { useContext } from "react"
import { validate } from "./validators"

export const useValidate = (validatedFields: ValidatedFields) => {
	const { commonConsts } = useContext(MainContext)
	const validateArgs = {
		errorMessages: commonConsts?.error_messages,
		validatedFields,
	}
	return validate(validateArgs)
}

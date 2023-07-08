import { errorText } from '@/app/_objects/formHelpers'
import type { Translation } from "@/app/i18n/dictionaries"
// import type { SerializedCustomerObject } from "@/interfaces/customers"
import type {
	FieldErrors,
	UseFormRegisterReturn
} from "react-hook-form"

export default function TextField({
	fieldProps,
	type = 'text',
	labels,
	busy,
	required,
	errorMessages,
	errors,
}: {
	fieldProps: UseFormRegisterReturn
	type?: string 
	labels: Object
	busy: boolean
	required?: boolean
	errorMessages?: Translation['errorMessages']
	errors?: FieldErrors
}) {
	const error = errors?.[fieldProps.name as keyof typeof errors]
	return <div className="relative">
		<input
			{...fieldProps}
			type={type}
			disabled={busy}
			id={fieldProps.name}
			className={`block px-2.5 pb-2.5 pt-4 w-full text-sm
			text-gray-900 bg-transparent rounded-lg	border
			${error ? 'border-red-600' : 'border-gray-300'}
			appearance-none	
			focus:outline-none focus:ring-0
			focus:${error ? 'border-red-600' : 'border-blue-600'}
			dark:text-white
			dark:${error ? 'border-red-600' : 'border-gray-600'}
			dark:focus:${error ? 'border-red-600' : 'border-blue-500'} peer`}
			placeholder=" " />
		{error && <p className='mt-2 text-xs text-red-600 dark:text-red-400'>
			<span className='font-medium'>
				{errorText(errorMessages, error)}
			</span>
		</p>}
		<label
			htmlFor={fieldProps.name}
			className={`absolute text-sm
				${error ? 'text-red-600' : 'text-gray-500'}
				dark:${error ? 'text-red-600' : 'text-gray-400'}
				duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
				bg-white	dark:bg-gray-900 px-2
				peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
				peer-placeholder-shown:scale-100
				peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
				peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}>
			{`${labels[fieldProps.name as keyof typeof labels]}
			${required ? ' *' : ''}`}
		</label>
	</div>
}

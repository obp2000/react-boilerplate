import {
	useOutletContext,
	useNavigate,
	useParams,
	useLocation,
} from 'react-router-dom'
import {useOptionsTrigger} from '../options/hooks'
import {toastSuccess, toastError} from '../Shared/Toast'

const emptyObject = {}

export const useObjectForm = ({
	indexUrl,
	object,
	formInitialValues,
	validate,
	useUpdateObjectMutation,
	useCreateObjectMutation,
}) => {
	const {
	    commonConsts: {
	      error_messages,
	      successfully,
	    } = emptyObject,
	    options,
  	} = useOutletContext()
  	useOptionsTrigger(indexUrl)
    const initialValues = formInitialValues(object, options)
  	const [	mutateObject,
  			{isLoading: isMutatingObject,
  			 isSuccess: isSuccessMutatingObject}] = object
		? useUpdateObjectMutation()
	 	: useCreateObjectMutation()
		const navigate = useNavigate()
   	const onSubmit = (values) => mutateObject(values).unwrap().
          then(() => {
          	navigate(indexUrl, {replace: true})
          	toastSuccess(successfully)
          }).
          catch(({detail}) => toastError(detail))

   	return {
	   	name: 'objectForm',
	   	initialValues: formInitialValues(object, options),
	   	validate: validate(error_messages),
	   	onSubmit,
	   	isMutatingObject,
	   	isSuccessMutatingObject,
	   	object,

   	}
}

export const useDigitId = () => {
	const {id} = useParams()
	return id.match(/^\d+$/) ? id : null
}

export const useObjectFromLocationState = () => {
  	const {state} = useLocation()
  	const {object} = state || emptyObject
  	return object
}

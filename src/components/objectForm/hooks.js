import {useRouter} from 'next/dist/client/router'
import {skipToken} from '@reduxjs/toolkit/query'
import {toastSuccess, toastError} from '../Shared/Toast'
import {useOptionsOuery} from '../options/hooks'

const emptyObject = {}

export const useObjectForm = ({
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  formDecorators,
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
}) => {
  	const {commonConsts, options} = useOptionsOuery(indexUrl)
  const router = useRouter()
	  const {query, isFallback} = router
  const id = query.id
	  const {
	    data: object,
	    isLoading: isLoadingObject,
	    isError: isErrorGettingObject,
	  } = useGetObjectQuery(
	    useTestObjectId(id) ? {id} : skipToken,
	    {skip: isFallback})
	  const mutateObjectHook = object ?
			useUpdateObjectMutation :
		 	useCreateObjectMutation
  	const [mutateObject,
  				{isLoading: isMutatingObject,
  			 	isSuccess: isSuccessMutatingObject}] = mutateObjectHook()
   	const onSubmit = (values) => mutateObject(values).unwrap().
      then(() => {
          	router.push(indexUrl, undefined, {shallow: true})
          	toastSuccess(commonConsts?.successfully)
      }).
      catch(({detail}) => toastError(detail))
   	return {
	   	name: 'objectForm',
	   	initialValues: formInitialValues(object, options),
	   	validate: validate(commonConsts?.error_messages),
	   	decorators: formDecorators(options),
	   	onSubmit,
	   	isMutatingObject,
	   	isSuccessMutatingObject,
	   	object,
    commonConsts,
    options,
	  	object,
	  	busyGettingObject: isLoadingObject || isFallback,
	  	isErrorGettingObject,
   	}
}

// export const useDigitId = () => {
// 	const {id} = useParams()
// 	return id.match(/^\d+$/) ? id : null
// }

// export const useObjectFromLocationState = () => {
//   	const {state} = useLocation()
//   	const {object} = state || emptyObject
//   	return object
// }

export const useHeader = ({
  object: {
    id,
    created_at: createdAt,
  } = emptyObject,
  commonConsts,
  options,
}) => ({
  nameSingular: options?.name_singular,
  from: commonConsts?.from,
  id,
  createdAt,
})

export const useTestObjectId = (id) =>
  (typeof id === 'string') && id.match(/^\d+$/)

export const useGetObject = ({useGetObjectQuery}) => {
  const router = useRouter()
  const {query, isFallback} = router
  const id = query.id
  const {
    data: object = emptyObject,
    isLoading: isLoadingObject,
    isError: isErrorGettingObject,
  } = useGetObjectQuery(
    useTestObjectId(id) ? {id} : skipToken,
    {skip: isFallback})
  return {
  	object,
  	busyGettingObject: isLoadingObject || isFallback,
  	isErrorGettingObject,
  }
}

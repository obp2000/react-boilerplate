import {useRouter} from 'next/dist/client/router'
import {skipToken} from '@reduxjs/toolkit/query'
import {toastSuccess, toastError} from '../Shared/Toast'
import {useOptionsOuery} from '../options/hooks'
// import {useObject} from '../../services/entityAdapter'
import {CustomerFormConfig} from '../customers/hooks'
import {
  // CommonConsts,
  // CustomerOptions,
  // ProductOptions,
  // OrderOptions,
  CustomerFormValues
} from '../../../interfaces'

const emptyObject = {}

export const useObjectForm = ({
  indexUrl,
  useGetObjectQuery,
  formInitialValues,
  formDecorators,
  mutators,
  validate,
  useUpdateObjectMutation,
  useCreateObjectMutation,
  objectFormRender,
  calculatedFields,
}: CustomerFormConfig) => {
  const { commonConsts, options } = useOptionsOuery(indexUrl)
  const router = useRouter()
  const { query, isFallback } = router
  const id = query.id
  const useGetObjectQueryArg = useTestObjectId(id)
    ? {id: Number(id)}
    : skipToken
  const {
    data: object,
    isLoading: isLoadingObject,
    isError: isErrorGettingObject,
  } = useGetObjectQuery(useGetObjectQueryArg, {skip: isFallback})
  // const object = objectFromQuery(query) ? query : data
  const mutateObjectHook = object ?
    useUpdateObjectMutation :
    useCreateObjectMutation
  const [mutateObject,
    {
      isLoading: isMutatingObject,
      isSuccess: isSuccessMutatingObject
    }
  ] = mutateObjectHook()
  const onSubmit = (values: CustomerFormValues) => mutateObject(values).
    unwrap().
    then(() => {
      router.push(indexUrl, undefined, { shallow: true })
      toastSuccess(commonConsts?.successfully)
    }).
    catch(({ detail }) => toastError(detail))
  return {
    name: 'objectForm',
    initialValues: formInitialValues(object, options),
    validate: validate(commonConsts?.error_messages),
    decorators: formDecorators(options),
    mutators,
    onSubmit,
    render: objectFormRender,
    isMutatingObject,
    isSuccessMutatingObject,
    object,
    commonConsts,
    options,
    busyGettingObject: isLoadingObject || isFallback,
    isErrorGettingObject,
    calculatedFields,
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



export const useTestObjectId = (id: string | string[] | undefined) =>
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

// export const objectFromQuery = (query) => Object.keys(query).length > 1

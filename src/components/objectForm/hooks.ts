import { useRouter } from 'next/dist/client/router'
import { skipToken } from '@reduxjs/toolkit/query'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { toastSuccess, toastError } from '../Shared/toast'
import { useOptionsOuery } from '../options/hooks'
import {
  isFetchBaseQueryError,
  isErrorWithMessage
} from '../../services/helpers'
import type {
  FormConfig as CustomerFormConfig
} from '../../../interfaces/customers'
import type {
  FormConfig as ProductFormConfig
} from '../../../interfaces/products'
import type {
  FormConfig as OrderFormConfig
} from '../../../interfaces/orders'
import type {
  SerializedError,
  AnyObjectFormValues,
  ObjectFormProps,
} from '../../../interfaces'

export function useObjectForm(props: CustomerFormConfig): ObjectFormProps
export function useObjectForm(props: ProductFormConfig): ObjectFormProps
export function useObjectForm(props: OrderFormConfig): ObjectFormProps
export function useObjectForm({
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
}: any): ObjectFormProps {
  const { commonConsts, options } = useOptionsOuery(indexUrl)
  const router = useRouter()
  const { query, isFallback } = router
  const id = query.id
  const useGetObjectQueryArg =
    useTestObjectId(id) ? { id: Number(id) } : skipToken
  const {
    data: object,
    isLoading: isLoadingObject,
    isError: isErrorGettingObject,
  } = useGetObjectQuery(useGetObjectQueryArg, { skip: isFallback })
  // if (isErrorGettingObject) {
  //   return <DefaultErrorPage statusCode={404} />
  // }
  const mutateObjectHook = object ?
    useUpdateObjectMutation :
    useCreateObjectMutation
  const [mutateObject,
    {
      isLoading: isMutatingObject,
      isSuccess: isSuccessMutatingObject
    }
  ] = mutateObjectHook()
  const onSubmit = (values: AnyObjectFormValues) =>
    mutateObject(values).unwrap().
      then(() => {
        router.push(indexUrl)
        toastSuccess(commonConsts?.successfully)
      }).
      catch((err: FetchBaseQueryError | SerializedError): void => {
        if (isFetchBaseQueryError(err)) {
          // you can access all properties of `FetchBaseQueryError` here
          const message = 'error' in err ? err.error : JSON.stringify(err.data)
          toastError(message)
        } else if (isErrorWithMessage(err)) {
          // you can access a string 'message' property here
          toastError(err.message)
        }
      })
  // catch(({ detail }: { detail: string }) => toastError(detail))
  return {
    name: 'objectForm',
    initialValues: formInitialValues({ object, options }),
    validate: validate(commonConsts?.error_messages),
    decorators: formDecorators,
    mutators,
    onSubmit,
    render: objectFormRender,
    isMutatingObject,
    isSuccessMutatingObject,
    busyGettingObject: isLoadingObject || isFallback,
    isErrorGettingObject,
    calculatedFields,
    object,
    options,
    commonConsts,
  }
}

export const useTestObjectId = (id: string | string[] | undefined) =>
  (typeof id === 'string') && id.match(/^\d+$/)

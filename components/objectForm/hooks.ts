import type {
  FormConfig as CustomerFormConfig
} from '@/interfaces/customers'
import type { AnyObjectFormValues } from '@/interfaces/objectForm'
import type { FormConfig as OrderFormConfig } from '@/interfaces/orders'
import type { FormConfig as ProductFormConfig } from '@/interfaces/products'
import { mutateObject } from '@/services/api/client'
import { MainContext, ObjectsContext } from '@/services/context'
import { validate } from '@/validators/validators'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { FormProps } from 'react-final-form'
import type { AnyObjectType } from '@/interfaces/api'

export function useObjectForm(props: CustomerFormConfig): FormProps
export function useObjectForm(props: ProductFormConfig): FormProps
export function useObjectForm(props: OrderFormConfig): FormProps
export function useObjectForm({
  useFormInitialValues,
  formDecorators,
  mutators,
  objectFormRender,
  validatedFields,
  modFormValues,
}: any): FormProps {
  const { commonConsts, accessToken, indexUrl } = useContext(MainContext)
  const { object } = useContext(ObjectsContext) as AnyObjectType
  const { refresh, push } = useRouter()
  const onSubmit = (values: AnyObjectFormValues) =>
    mutateObject(object, modFormValues(values),
      indexUrl as string, accessToken as string,
      commonConsts?.successfully, refresh)
  return {
    name: 'objectForm',
    initialValues: useFormInitialValues({ object }),
    validate: validate({
      errorMessages: commonConsts?.error_messages,
      validatedFields
    }),
    decorators: formDecorators,
    mutators,
    onSubmit,
    render: objectFormRender,
  }
}

export const useTestObjectId = (id: string | string[] | undefined) =>
  (typeof id === 'string') && id.match(/^\d+$/)


  // // const { query, isFallback } = router
  // // const id = query.id
  // const id = params.id
  // const useGetObjectQueryArg =
  //   useTestObjectId(id) ? { id: Number(id) } : skipToken
  // const {
  //   data: object,
  //   isLoading: isLoadingObject,
  //   isError: isErrorGettingObject,
  //   // } = useGetObjectQuery(useGetObjectQueryArg, { skip: isFallback })
  // } = useGetObjectQuery(useGetObjectQueryArg)
  // // if (isErrorGettingObject) {
  // //   return <DefaultErrorPage statusCode={404} />
  // // }


  // const mutateObjectHook = object
  //   ? useUpdateObjectMutation
  //   : useCreateObjectMutation
  // const [mutateObject,
  //   {
  //     isLoading: isMutatingObject,
  //     isSuccess: isSuccessMutatingObject
  //   }
  // ] = mutateObjectHook()

  // const onSubmit1 = (values: AnyObjectFormValues) =>
  //   mutateObject(values).unwrap().
  //     then(() => {
  //       toastSuccess(commonConsts?.successfully)
  //       router.push(indexUrl)
  //     }).
  //     catch((err: FetchBaseQueryError | SerializedError): void => {
  //       if (isFetchBaseQueryError(err)) {
  //         // you can access all properties of `FetchBaseQueryError` here
  //         const message = 'error' in err ? err.error : JSON.stringify(err.data)
  //         toastError(message)
  //       } else if (isErrorWithMessage(err)) {
  //         // you can access a string 'message' property here
  //         toastError(err.message)
  //       }
  //     })

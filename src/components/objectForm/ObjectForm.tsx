import { Form } from 'react-final-form'
import { useRouter } from 'next/dist/client/router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useTestObjectId } from './hooks'
import { toastSuccess, toastError } from '../Shared/Toast'
import { useOptionsOuery } from '../options/hooks'
import {
  CustomerFormValues,
  ProductFormValues,
  OrderFormValues,
} from '../../../interfaces'
import { CustomerFormConfig } from '../customers/hooks'
import { ProductFormConfig } from '../products/hooks'
import { OrderFormConfig } from '../orders/hooks'

type FormValues = CustomerFormValues & ProductFormValues & OrderFormValues

function ObjectForm(props: CustomerFormConfig): JSX.Element
function ObjectForm(props: ProductFormConfig): JSX.Element
function ObjectForm(props: OrderFormConfig): JSX.Element
function ObjectForm({
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
}: any): JSX.Element {
  // if (isErrorGettingObject) {
  //   return <DefaultErrorPage statusCode={404} />
  // }
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
  const onSubmit = (values: FormValues) => mutateObject(values).unwrap().
    then(() => {
      router.push(indexUrl, undefined, { shallow: true })
      toastSuccess(commonConsts?.successfully)
    }).
    catch(({ detail }: { detail: string }) => toastError(detail))
  const formProps = {
    name: 'objectForm',
    initialValues: formInitialValues({ object, options }),
    validate: validate(commonConsts?.error_messages),
    decorators: formDecorators(options),
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
  return <Form {...formProps} />
}

export default ObjectForm

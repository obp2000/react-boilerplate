import {Form} from 'react-final-form'
import type {FormProps} from 'react-final-form'
// import Loader from 'react-loader'
// import NextNProgress from 'nextjs-progressbar'
// import DefaultErrorPage from 'next/error'
// import {useGetObject} from './hooks'
import {
  CommonConsts,
  CustomerOptions,
  ProductOptions,
  OrderOptions,
} from '../../../interfaces'

type Props = FormProps & {
  options: CustomerOptions | ProductOptions | OrderOptions
  commonConsts: CommonConsts
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
  calculatedFields?: string[]
  busyGettingObject?: boolean
  isErrorGettingObject?: boolean
}

export default ({
  busyGettingObject,
  isErrorGettingObject,
  ...props
}: Props): JSX.Element => {
  // if (isErrorGettingObject) {
  //   return <DefaultErrorPage statusCode={404} />
  // }
  return <Form {...props} />
}

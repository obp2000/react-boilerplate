import {Form} from 'react-final-form'
import type {FormProps} from 'react-final-form'
import {useSearchForm} from './hooks'
import {
  CommonConsts,
  CustomerOptions,
  ProductOptions,
  OrderOptions,
  UserOptions,
} from '../../../interfaces'

type Props = FormProps & {
  options: CustomerOptions | ProductOptions | OrderOptions | UserOptions
  commonConsts?: CommonConsts
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
  calculatedFields?: string[]
}

export default (props: Props) => {
  const searchFormAttrs = useSearchForm()
  // console.log('searchFormAttrs ', searchFormAttrs)
  return <Form {...searchFormAttrs} {...props} />
}

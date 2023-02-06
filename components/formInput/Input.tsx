import { InputFieldRenderProps } from '@/interfaces/formInput'
import { useFieldProps } from './hooks'
import WidgetErrors from './WidgetErrors'
// import Tooltip from '@/client/Tooltip'
// import { FcCancel } from 'react-icons/fc'

export default function InputComp(props: InputFieldRenderProps) {
  const { color, isInvalid, isValid, ...rest } = useFieldProps(props)
  if (isInvalid) {
    rest.className = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
  }
  return <>
    <input {...rest} />
    {isInvalid && <WidgetErrors {...props.meta} />}
  </>
}

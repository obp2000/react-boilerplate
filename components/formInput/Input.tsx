import type { FieldRenderProps } from 'react-final-form'
import FormTextList from './FormTextList'
import { useFieldProps } from './hooks'
import WidgetErrors from './WidgetErrors'
import Image from 'next/image'
// import Tooltip from '@/client/Tooltip'
// import { FcCancel } from 'react-icons/fc'

export default function InputComp(props: FieldRenderProps<any>) {
  const { color, isInvalid, isValid, previewUrl, ...rest } = useFieldProps(props)
  if (isInvalid) {
    rest.className = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
  }
  return <>
    {previewUrl && <Image
      alt="file uploader preview"
      // objectFit="cover"
      src={previewUrl}
      width={200}
      height={200}
    />}
    <input {...rest} />
    <WidgetErrors {...props.meta} />
    <FormTextList {...props} />
{/*    {previewUrl && <Tooltip content={'Cancel'}>
      <FcCancel
        aria-labelledby={'Cancel'}
        onClick={onClick}
        cursor='pointer' />
    </Tooltip>}*/}
  </>
}

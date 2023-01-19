import { useFieldProps as useLabelProps } from '@/inputLabel/hooks'
import type { FieldRenderProps } from 'react-final-form'
import Input from './Input'

export default function FloatingFormGroup(props: FieldRenderProps<any>) {
  const { label, required, htmlFor } = useLabelProps(props)
  return <div className="relative">
      <Input
        {...props}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        htmlFor={htmlFor}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {`${label}${required ? '*' : ''}`}
      </label>
    </div>
}










// export default function FloatingFormGroup222(props: FieldRenderProps<any>) {
//   const { id } = useFieldProps(props)
//   const { label, required } = useLabelProps(props)
//   return <FloatingLabel
//     controlId={id}
//     label={`${label}${required ? '*' : ''}`}
//     className="mb-3"
//   >
//     <Input {...props} id={undefined} />
//   </FloatingLabel>
// }


  // return <Form.Group floating >
  //   <Input {...props} />
  //   <Label {...props} size='sm' />
  // </Form.Group>

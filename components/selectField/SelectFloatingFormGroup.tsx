import FormTextList from '@/formInput/FormTextList'
import SelectField from './SelectField'
import Label from '@/inputLabel/Label'
import { SelectFieldRenderProps } from '@/interfaces/selectField'

export default function FloatingFormGroup({
  helpText,
  ...props
}: SelectFieldRenderProps
) {
  return <>
    <div className="relative">
      <SelectField {...props}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <Label {...props}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      />
    </div>
    <FormTextList {...{ helpText }} />
  </>
}


// export function SelectFloatingFormGroup1(props: SelectFieldAttrs) {
//   const { placeholder, required, htmlFor } = useFieldProps(props)
//   return <div className="mb-2 block">
//     <Label
//       htmlFor={htmlFor}
//       value={`${placeholder}${required ? '*' : ''}`}
//     />
//     <SelectField {...props} />
//   </div>
// }



  // return <FloatingLabel
  //   controlId={id}
  //   label={`${placeholder}${required ? '*' : ''}`}
  //   className="mb-3"
  // >
  //   <SelectField {...props} />
  // </FloatingLabel>
'use client'

import FormTextList from '@/formInput/FormTextList'
import { useFieldProps as useLabelProps } from '@/inputLabel/hooks'
import { FieldRenderProps } from 'react-final-form'
import { DropdownProps } from 'react-widgets/cjs/DropdownList'
import DropdownList from './DropdownList'

export default function DropdownListFormGroup(props: FieldRenderProps<any> & DropdownProps<any>) {
  const { label, required, htmlFor } = useLabelProps(props)
  return <>
    <div className="relative">
      <DropdownList {...props}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        htmlFor={htmlFor}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {`${label}${required ? '*' : ''}`}
      </label>
    </div>
    <FormTextList {...props} />
  </>
}


// export default function DropdownListFormGroup222(props: DropdownListAttrs) {
//   const { label, required } = useLabelProps(props)
//   return <div>
//     <div className="mb-2 mr-3 inline">
//       <Label {...useLabelProps(props)}>
//         {`${label}${required ? '*' : ''}`}
//       </Label>
//     </div>
//     <DropdownList {...props} />
//   </div>
// }
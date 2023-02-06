import ToggleSwitch from '@/client/ToggleSwitch'
import Label from '@/inputLabel/Label'
import { InputFieldRenderProps } from '@/interfaces/formInput'
import { useState } from 'react'
import FormTextList from './FormTextList'

export default function SwitchFormGroup({
  helpText,
  ...props
}: InputFieldRenderProps) {
  const [enabled, setEnabled] = useState(!!props.input.checked)
  // console.log('props... ', props)
  return <div className="relative pt-3">
    <ToggleSwitch
      name={props.input.name}
      checked={enabled}
      label=''
      disabled={props.disabled}
      onChange={setEnabled}
    />
    <Label {...props}
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
    />
    <FormTextList {...{ helpText }} />
  </div>
}

import ToggleSwitch from '@/client/ToggleSwitch'
import { useFieldProps as useLabelProps } from '@/inputLabel/hooks'
import type { FieldRenderProps } from 'react-final-form'
import { useFieldProps } from './hooks'

export default function SwitchFormGroup(props: FieldRenderProps<any>) {
  const { name, id, disabled, value, checked } = useFieldProps(props)
  const { label, required, htmlFor } = useLabelProps(props)
  console.log('value, checked ', value, checked)
  return <div className="relative pt-3">
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox"
        className="sr-only peer" name={name} id={id} value='true' defaultChecked={!!checked} disabled={disabled} />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
    {/*    <ToggleSwitch
      name={name}
      id={id}
      checked={!!checked}
      // label={`${label}${required ? '*' : ''}`}
      label=''
      disabled={disabled}
      // onChange={bound Gi}
      // className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    />*/}
    <label
      htmlFor={htmlFor}
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
    >
      {`${label}${required ? '*' : ''}`}
    </label>
  </div>
}


// return <FormGroup check className='form-switch'>
//   <Input {...props} role="switch" />
//   <Label {...props} />
// </FormGroup>

{/*<Form.Check
    {...rest}
    type="switch"
    label={`${label}${required ? '*' : ''}`}
  />*/}

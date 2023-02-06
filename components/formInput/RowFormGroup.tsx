import Label from '@/inputLabel/Label'
import { InputFieldRenderProps } from '@/interfaces/formInput'
import FormTextList from './FormTextList'
import Input from './Input'

export default function RowFormGroup({
  helpText,
  ...props
}: InputFieldRenderProps) {
  return <div>
    <div className="mb-2 mr-3 inline">
      <Label {...props} />
    </div>
    <Input {...props} />
    <FormTextList {...{ helpText }} />
  </div>
}

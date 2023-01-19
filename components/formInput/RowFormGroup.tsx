import { useFieldProps as useLabelProps } from '@/inputLabel/hooks'
import Label from '@/client/Label'
import type { FieldRenderProps } from 'react-final-form'
import Input from './Input'

export default function RowFormGroup(props: FieldRenderProps<any>) {
  const { label, required } = useLabelProps(props)
  return <div>
    <div className="mb-2 mr-3 inline">
      <Label {...useLabelProps(props)}>
        {`${label}${required ? '*' : ''}`}
      </Label>
    </div>
    <Input {...props} />
  </div>
}

import { FC } from 'react'
import type { FieldRenderProps } from 'react-final-form'
import { Input } from 'reactstrap'
import FormTextList from './FormTextList'
import { useFieldProps } from './hooks'
import WidgetErrors from './WidgetErrors'

const InputComp: FC<FieldRenderProps<any>> = (props) => <>
  <Input {...useFieldProps(props)} />
  <WidgetErrors {...props.meta} />
  <FormTextList {...props} />
</>

export default InputComp

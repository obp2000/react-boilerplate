import { Input } from 'reactstrap'
import type { FieldAttrs } from '../../../interfaces/input'
import FormTextList from './FormTextList'
import { useFieldProps } from './hooks'
import WidgetErrors from './WidgetErrors'

const InputComp = (props: FieldAttrs): JSX.Element => <>
  <Input {...useFieldProps(props)} />
  <WidgetErrors {...props.meta} />
  <FormTextList {...props} />
</>

export default InputComp

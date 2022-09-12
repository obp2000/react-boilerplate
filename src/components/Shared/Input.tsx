import { Input } from 'reactstrap'
import type { InputType } from 'reactstrap/types/lib/Input'
import { ChangeEventHandler } from 'react'
import WidgetErrors from './WidgetErrors'
import FormTextList from './FormTextList'
import { useInput } from './FieldProps'
import type { FieldAttrs } from './FieldProps'

const InputComp = (props: FieldAttrs): JSX.Element => {
  const { type, label, helpText, onChange, ...inputProps } = useInput(props)
  return <>
    <Input {...inputProps} type={type as InputType}
      onChange={onChange as ChangeEventHandler} />
    <WidgetErrors {...props.meta} />
    <FormTextList formText={helpText} />
  </>
}

export default InputComp


// import { Input } from 'reactstrap'
// import WidgetErrors from './WidgetErrors'
// import FormTextList from './FormTextList'
// import { useInput, useFormText } from './FieldProps'
// import type { FieldAttrs } from './FieldProps'

// const InputComp = (props) => {
//   return <>
//           <Input {...useInput(props)} />
//           <WidgetErrors {...props.meta} />
//           <FormTextList formText={useFormText(props)} />
//         </>
// }

// export default InputComp

// import type {FormRenderProps, FieldRenderProps, FieldMetaState} from 'react-final-form'

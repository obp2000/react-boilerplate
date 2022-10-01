import React from 'react'
// import { FieldProps } from 'react-final-form'
import { Input } from 'reactstrap'
import type { InputType } from 'reactstrap/types/lib/Input'
import WidgetErrors from './WidgetErrors'
import FormTextList from '../Shared/FormTextList'
import { useInput } from './hooks'
import type { FieldAttrs } from '../../../interfaces'

const InputComp = (props: FieldAttrs): JSX.Element => {
  const { type, label, helpText, onChange, ...inputProps } = useInput(props)
  return <>
    <Input {...inputProps} type={type as InputType} onChange={onChange} />
    <WidgetErrors {...props.meta} />
    <FormTextList formText={helpText} />
  </>
}

export default InputComp


// import { Input } from 'reactstrap'
// import WidgetErrors from './WidgetErrors'
// import FormTextList from './FormTextList'
// import { useInput, useFormText } from './fieldProps'
// import type { FieldAttrs } from './fieldProps'

// const InputComp = (props) => {
//   return <>
//           <Input {...useInput(props)} />
//           <WidgetErrors {...props.meta} />
//           <FormTextList formText={useFormText(props)} />
//         </>
// }

// export default InputComp

// import type {FormRenderProps, FieldRenderProps, FieldMetaState} from 'react-final-form'

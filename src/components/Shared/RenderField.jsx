import React from 'react'
import { Input } from 'reactstrap'
import WidgetErrors from './WidgetErrors'

const renderField = ({input, meta, ...rest}) =>
    <>
        <Input {...input} {...rest} />
        <WidgetErrors {...meta} />
    </>

export default renderField


// const renderField1 = ({
//     input,
//     meta,
//     placeholder,
//     readOnly,
//     className,
//     bsSize,
//     style,
//     step,
//     defaultValue,
//     normalize
// }) => <>
//         <Input
//             {...input}
//             placeholder={placeholder}
//             readOnly={readOnly}
//             className={className}
//             bsSize={bsSize}
//             defaultValue={defaultValue}
//             normalize={normalize}
//             step={step}
//             style={style}
//         />
//         <WidgetErrors {...meta} />
// </>
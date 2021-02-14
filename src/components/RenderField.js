import React from 'react'
import { Input } from 'reactstrap'

const renderField = ({
    input,
    label,
    type,
    meta: {
        touched,
        error,
        warning
    },
    readOnly,
    className,
    bsSize,
    style,
    step,
    defaultValue,
    normalize
}) => (
    <div>
        <Input
            {...input}
            placeholder={label}
            type={type}
            readOnly={readOnly}
            className={className}
            bsSize={bsSize}
            defaultValue={defaultValue}
            normalize={normalize}
            step={step}
            style={style}/> 
            {touched && ((error && <div>
            <small className="text-danger" role="alert">
                {error}
            </small></div>) || (warning && <div>{warning}</div>))}
    </div>
)

export default renderField
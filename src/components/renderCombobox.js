import React from 'react'
import Combobox from 'react-widgets/lib/Combobox'

const renderCombobox = ({
  input,
  data,
  valueField,
  textField,
  defaultValue,
  normalize,
  onToggle,
  onSelect,
  inputProps,
  meta: {
    touched,
    error,
    warning
  },
  isFetching
}) => <>
  {isFetching ? <Combobox busy /> :
    <Combobox
      {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange}
      onBlur={() => input.onBlur()}
      defaultValue={defaultValue}
      normalize={normalize}
      onToggle={onToggle}
      onSelect={onSelect}
      inputProps={inputProps}
      messages={
        {emptyList: 'Не найдено'}
      }
    />}
    {touched && ((error && <div>
        <small className="text-danger" role="alert">
          {error}
        </small>
      </div>) || (warning && <div>{warning}</div>))}
</>

export default renderCombobox
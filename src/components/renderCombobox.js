import React from 'react'
import Combobox from 'react-widgets/lib/Combobox'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'

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
  meta,
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
      messages={WidgetMessages}
    />}
  <WidgetErrors {...meta} />
</>

export default renderCombobox
import React from 'react'
import DropdownList from 'react-widgets/lib/DropdownList'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'

const renderDropdownList = ({
  input,
  data,
  valueField,
  textField,
  onSearch,
  defaultValue,
  onToggle,
  onSelect,
  normalize,
  inputProps,
  meta,
  isFetching
}) => <>
<DropdownList
  filter='contains'
  {...input}
  data={data}
  valueField={valueField}
  textField={textField}
  onChange={input.onChange}
  onBlur={input.onBlur}
  onSearch={onSearch}
  defaultValue={defaultValue}
  onToggle={onToggle}
  onSelect={onSelect}
  normalize={normalize}
  messages={WidgetMessages}
  />
  <WidgetErrors {...meta} />
</>

export default renderDropdownList
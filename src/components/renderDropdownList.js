import React from 'react'
import DropdownList from 'react-widgets/lib/DropdownList'

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
  // messages
}) => <DropdownList
  filter
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
  // messages={messages}
  messages={{emptyFilter: 'Не найдено', 
             emptyList: 'Не найдено'}}
  />

export default renderDropdownList
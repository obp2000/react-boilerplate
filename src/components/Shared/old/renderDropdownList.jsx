import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'

const renderDropdownList = ({
  input,
  meta,
  ...rest
}) => {
    // let containerClassName
    // if (meta.touched) {
    //   if (meta.error) {
    //     containerClassName = 'is-invalid'
    //   } else {
    //     containerClassName ='is-valid'
    //   }
    // }
    // else {
    //   containerClassName = 'form-control'
    // }
    return <>
      <DropdownList
          {...input}
          data={meta.data}
          messages={WidgetMessages}
          // containerClassName={containerClassName}
          {...rest}
        />
        <WidgetErrors {...meta} />
    </>
    }

export default renderDropdownList

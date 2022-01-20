import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'

const renderDropdownList = ({
  input,
  meta,
  ...rest
}) => <>
        <DropdownList
          {...input}
          data={meta.data}
          messages={WidgetMessages}
          {...rest}
        />
        <WidgetErrors {...meta} />
      </>

export default renderDropdownList


// const renderDropdownList1 = ({
//   input,
//   data,
//   valueField,
//   textField,
//   onSearch,
//   defaultValue,
//   onToggle,
//   onSelect,
//   normalize,
//   meta,
//   isFetching
// }) => <>
// <DropdownList
//     filter='contains'
//     {...input}
//     data={data}
//     valueField={valueField}
//     textField={textField}
//     onChange={input.onChange}
//     onBlur={input.onBlur}
//     onSearch={onSearch}
//     defaultValue={defaultValue}
//     onToggle={onToggle}
//     onSelect={onSelect}
//     normalize={normalize}
//     messages={WidgetMessages}
//   />
//   <WidgetErrors {...meta} />
// </>

// const renderDropdownList_w = ({
//   input,
//   textField,
//   filter,
//   isFetching,
//   meta,
//   onSearch,
//   normalize
// }) => <>
//         <DropdownList
//           {...input}
//           textField={textField}
//           data={meta.data}
//           filter={filter}
//           onSearch={onSearch}
//           normalize={normalize}
//           messages={WidgetMessages}
//           busy={isFetching}
//         />

//         <WidgetErrors {...meta} />
//       </>
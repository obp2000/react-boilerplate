import React from 'react'
import Combobox from 'react-widgets/Combobox'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'

const renderCombobox = ({
  input,
  dataKey,
  textField,
  filter,
  isFetching,
  meta,
  onChange,
  normalize,
}) => <> {
        isFetching ? <Combobox busy /> :
        <Combobox
          {...input}
          name={input.name}
          defaultValue={input.value}
          textField={textField}
          data={meta.data}
          filter={filter}
          onChange={onChange}

          normalize={normalize}
          messages={WidgetMessages}
        />
}

<WidgetErrors {...meta} />
</>

export default renderCombobox

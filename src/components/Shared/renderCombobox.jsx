import React from 'react'
import Combobox from 'react-widgets/Combobox'
import WidgetErrors from './WidgetErrors'
import WidgetMessages from './WidgetMessages'

const renderCombobox1 = ({
    input,
    data,
    dataKey,
    textField,
    onChange,
    meta,
    defaultValue,
    normalize,
    onToggle,
    isFetching,
    filter
}) => < > {
    isFetching ? <Combobox busy /> : <Combobox
      {...input}
      data={data}
      dataKey={dataKey}
      textField={textField}
      onChange={(event, value) => console.log('event: ', event)}
      defaultValue={defaultValue}
      normalize={normalize}
      onToggle={onToggle}
      messages={WidgetMessages}
      filter={filter}
    />
}
<WidgetErrors {...meta} /> <
/>

const renderCombobox = ({
    input,
    dataKey,
    textField,
    filter,
    isFetching,
    meta,
    onChange,
    normalize
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
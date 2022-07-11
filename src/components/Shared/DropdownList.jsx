import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import {useOutletContext} from 'react-router-dom'
import WidgetErrors from './WidgetErrors'
import widgetMessages from './WidgetMessages'
import FormTextList from './FormTextList'
import {useLazySearchObjectsQuery} from '../Search/apiSlice'
import {getFormText, getFieldAttrs} from './FieldProps'

const DropdownListComp = ({
  input,
  meta,
  options = useOutletContext()?.options,
  searchPath: url,
  notFound = useOutletContext()?.commonConsts?.not_found,
  ...props
}) => {
  const [searchTrigger, {data, isFetching}] = useLazySearchObjectsQuery()
  const onSearch = (term) => {
    if (term.length == 2) {searchTrigger({url, params: {term}}, true)}
  }
  return <>
    <DropdownList
      {...input}
      {...getFieldAttrs(input, meta, options)}
      data={data}
      onSearch={onSearch}
      busy={isFetching}
      filter='contains'
      messages={widgetMessages(notFound)}
      {...props}
    />
    <WidgetErrors {...meta} />
    <FormTextList formText={getFormText(input, options, props)} />
  </>
}

DropdownListComp.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  options: PropTypes.object,
  searchPath: PropTypes.string,
  notFound: PropTypes.string,
  props: PropTypes.string,
}

export default DropdownListComp

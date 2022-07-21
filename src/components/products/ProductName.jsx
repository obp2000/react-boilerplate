import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import Fleece from './Fleece'

const ProductName = ({
  get_product_type_display: getProductTypeDisplay,
  threads,
  get_threads_display: getThreadsDisplay,
  contents,
  get_contents_display: getContentsDisplay,
  fleece,
  name,
  options = useOutletContext().options
}) => {
    return <>
        {getProductTypeDisplay && (getProductTypeDisplay + ' ')}
        {(threads !== null) && (getThreadsDisplay + ' ')}
        {(contents !== null) && (getContentsDisplay + ' ')}
        <Fleece fleece={fleece} label={options?.fleece?.label} />
        {name}
    </>
}

export default ProductName

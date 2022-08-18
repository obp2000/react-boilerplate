import PropTypes from 'prop-types'
import React from 'react'
import Fleece from './Fleece'
import {useProductName} from './hooks'

const ProductName = (props) => {
  const {
    productType,
    threads,
    contents,
    fleeceProps,
    name,
  } = useProductName(props)
  return <>
    {productType}
    {threads}
    {contents}
    <Fleece {...fleeceProps} />
    {name}
  </>
}

ProductName.propTypes = {
  props: PropTypes.object,
}

export default ProductName

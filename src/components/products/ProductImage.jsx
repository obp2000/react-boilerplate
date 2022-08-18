import PropTypes from 'prop-types'
import React from 'react'
import Image from 'next/image'
import {useProductImage} from './hooks'

const ProductImage = (props) => {
  const {image, label} = useProductImage(props)
  return <Image
    src={image}
    alt={label}
    width={500}
    height={500}
    className='img-thumbnail rounded float-start'
  />
}

ProductImage.propTypes = {
  props: PropTypes.object,
}

export default ProductImage

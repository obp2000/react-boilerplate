import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import blank from '../../assets/img/blank.png'

const emptyObject = {}

const ProductImage = ({
    initialValues: {
        image = String(blank)
    }
} = emptyObject) => {
  const {options: {
    image: {
      label
    } = emptyObject
  } = emptyObject} = useOutletContext()
  return  <img
            alt={label}
            src={image}
            className='img-thumbnail rounded float-start'
          />
}

ProductImage.propTypes = {
  image: PropTypes.string,
}

export default ProductImage

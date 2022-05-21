import PropTypes from 'prop-types'
import React from 'react'
import blank from '../../assets/img/blank.png'

const ProductImage = ({image, label}) =>
  <img alt={label}
		 src={image || String(blank)}
		 className='img-thumbnail rounded float-start'
  />

ProductImage.propTypes = {
  image: PropTypes.string,
  label: PropTypes.string,
}

export default ProductImage

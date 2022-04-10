import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import blank from '../../assets/img/blank.png'
import { selectImageLabel } from '../redux/CommonConsts'

const ProductImage = ({
	initialValues: {
		image
	}
}) => <img alt={useSelector(selectImageLabel)}
         src={image || String(blank)}
         className='img-thumbnail rounded float-start'
    />

ProductImage.propTypes = {
    image: PropTypes.string,
}

export default ProductImage

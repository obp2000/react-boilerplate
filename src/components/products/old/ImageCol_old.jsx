import PropTypes from 'prop-types'
import React from 'react'
import {Col} from 'reactstrap'
import blank from '../../assets/img/blank.png'

const ImageCol = ({image, size}) =>
  <Col sm={size}>
    <img alt="Фото" src={image || String(blank)}
      className='img-thumbnail rounded float-start'/>
  </Col>

ImageCol.propTypes = {
  image: PropTypes.string,
  size: PropTypes.number,
}

// ImageCol.defaultProps = {
//     image: String(blank)
// }

export default ImageCol

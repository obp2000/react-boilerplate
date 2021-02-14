import PropTypes from 'prop-types'
import React from 'react'

const PriceRubM = ({
	price_rub_m,
	coeff
}) => <span >
		<b>{coeff} - ></b> 
		{price_rub_m.toFixed(0)} 
		&nbsp; 
	  </span>

PriceRubM.propTypes = {
	price_rub_m: PropTypes.number,
	coeff: PropTypes.number
}

PriceRubM.defaultProps = {
	price_rub_m: 0,
	coeff: 1
}

export default PriceRubM
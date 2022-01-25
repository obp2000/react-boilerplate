import PropTypes from 'prop-types'
import React from 'react'

const TdText = ({label, colSpan}) =>
	<td colSpan={colSpan}>
		{label}
	</td>

TdText.propTypes = {
    label: PropTypes.string,
    colSspan: PropTypes.number
}

export default TdText

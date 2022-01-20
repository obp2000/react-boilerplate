import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'

const BackButton = ({ goBack }) =>
    <Button
		color = "primary"
		outline size = "sm"
		onClick={goBack}
	>
		Назад
	</Button>

BackButton.propTypes = {
    goBack: PropTypes.func.isRequired
}

export default BackButton
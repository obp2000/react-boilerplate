import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { goBack } from 'connected-react-router'
import { Button } from 'reactstrap'

const BackButton = () => {
	const dispatch = useDispatch()
    return <Button
		color = "primary"
		outline size = "sm"
		onClick={() => dispatch(goBack())}
	>
		Назад
	</Button>
}

export default BackButton
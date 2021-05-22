import React from 'react'

const WidgetErrors = ({
	touched,
	error,
	warning
}) => {
	if (touched && error) {
		return <div>
			<small className = "text-danger" role = "alert"> {error} </small> 
		</div>
	} else if (touched && warning) {
		return <div>{warning}</div>
	} else {
		return null
	}

}

export default WidgetErrors
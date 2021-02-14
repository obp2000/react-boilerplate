const ConfirmAction = (action, text) => e => {
	e.preventDefault()
	if (confirm(text)) {
		action()
	}
}


export default ConfirmAction
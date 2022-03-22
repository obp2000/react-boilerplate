import React from "react"
import PropTypes from "prop-types"
import "regenerator-runtime/runtime"
import Confirmation from "./Confirmation"

const ConfirmAction = (action,
					   text,
					   proceedLabel = 'Ok',
					   cancelLabel = 'cancel') => async () => {
    const confirm = confirmation => Confirmation({
        confirmation,
        proceedLabel,
        cancelLabel
    })

    if (await confirm(text)) {
        action()
    }
}

export default ConfirmAction
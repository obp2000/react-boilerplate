import PropTypes from 'prop-types'
import React from 'react'
import { DeleteText, DeleteQuestion } from './Texts'
import ConfirmAction from './ConfirmAction'

const DeleteButton = ({ action }) =>
    <button
        onClick={ConfirmAction(action, DeleteQuestion)}
        className="btn btn-outline-primary btn-sm"
    >
        {DeleteText}
    </button>

DeleteButton.propTypes = {
    action: PropTypes.func.isRequired
}

export default DeleteButton
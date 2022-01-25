import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'
import { DeleteText, DeleteQuestion } from './Texts'
import ConfirmAction from './ConfirmAction'

const DeleteButton = ({ action }) =>
    <Button size='sm' outline onClick={ConfirmAction(action, DeleteQuestion)}>
        {DeleteText}
    </Button>

DeleteButton.propTypes = {
    action: PropTypes.func.isRequired
}

export default DeleteButton
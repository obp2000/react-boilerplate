import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'
import { DeleteMessages } from './Texts'
import ConfirmAction from './ConfirmAction'

const DeleteButton = ({ action }) =>
    <Button size='sm' outline onClick={ConfirmAction(action, DeleteMessages.Question)}>
        {DeleteMessages.Text}
    </Button>

DeleteButton.propTypes = {
    action: PropTypes.func.isRequired
}

export default DeleteButton
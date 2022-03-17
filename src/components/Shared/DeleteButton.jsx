import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'
import ConfirmAction from './ConfirmAction'

const DeleteButton = ({
    action,
    ['delete']: text_delete

}) =>
    <Button size='sm' outline onClick={ConfirmAction(action, `${text_delete}?`)}>
        {text_delete}
    </Button>

DeleteButton.propTypes = {
    action: PropTypes.func.isRequired
}

export default DeleteButton
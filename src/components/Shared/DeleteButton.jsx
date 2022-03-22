import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'
import ConfirmAction from './ConfirmAction'

const DeleteButton = ({
    action,
    ['delete']: text_delete,
    yes,
    no
}) =>
    <Button size='sm'
            outline
            onClick={ConfirmAction(action, `${text_delete}?`, yes, no)}>
        {text_delete}
    </Button>

DeleteButton.propTypes = {
    action: PropTypes.func.isRequired
}

export default DeleteButton
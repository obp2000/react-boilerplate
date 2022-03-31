import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'reactstrap'
import ConfirmAction from './ConfirmAction'

const DeleteButton = ({
    id,
    deleteObjectAction,
    ['delete']: text_delete,
    yes,
    no
}) =>
    <Button size='sm'
            outline
            onClick={ConfirmAction(() => deleteObjectAction(id), `${text_delete}?`, yes, no)}>
        {text_delete}
    </Button>

DeleteButton.propTypes = {
    deleteObjectAction: PropTypes.func.isRequired
}

export default DeleteButton
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import ConfirmAction from './ConfirmAction'
import {
    selectTextDelete,
    selectYes,
    selectNo
} from '../redux/CommonConsts'

const DeleteButton = ({
    id,
    deleteObjectAction
}) => {
    const text_delete = useSelector(selectTextDelete)
    const yes = useSelector(selectYes)
    const no = useSelector(selectNo)
    return <Button size='sm'
            outline
            onClick={ConfirmAction(() => deleteObjectAction(id), `${text_delete}?`, yes, no)}>
        {text_delete}
    </Button>
}

DeleteButton.propTypes = {
    deleteObjectAction: PropTypes.func.isRequired
}

export default DeleteButton
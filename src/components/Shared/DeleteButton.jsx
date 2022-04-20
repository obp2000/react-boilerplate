import PropTypes from 'prop-types'
import React from 'react'
// import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import ConfirmAction from './ConfirmAction'
// import { selectCommonConsts } from '../redux/CommonConsts'
// import { useCommonConsts } from '../../services/apiSlice'

const DeleteButton = ({
    id,
    deleteObjectAction,
    delete: delete_text,
    yes,
    no
}) => {
    return <Button size='sm'
            outline
            onClick={ConfirmAction(() => deleteObjectAction(id),
                    `${delete_text}?`, yes, no)}>
        {delete_text}
    </Button>
}

DeleteButton.propTypes = {
    id: PropTypes.number,
    deleteObjectAction: PropTypes.func.isRequired
}

export default DeleteButton
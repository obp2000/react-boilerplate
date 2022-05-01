import PropTypes from 'prop-types'
import React from 'react'
import {toast} from 'react-toastify'
import {Button} from 'reactstrap'
import confirmAction from './ConfirmAction'

const DeleteButton = ({
  url,
  id,
  deleteObjectAction,
  delete: deleteText,
  yes,
  no,
  successfully,
}) => {
  return <Button size='sm'
    outline
    onClick={confirmAction(() => deleteObjectAction({url, id}).unwrap()
        .then(() => {
          toast.dismiss()
          toast.success(successfully)
        })
        .catch(({data}) => toast.error(data.detail, {autoClose: false})),
    `${deleteText}?`, yes, no)}>
    {deleteText}
  </Button>
}

DeleteButton.propTypes = {
  url: PropTypes.string,
  id: PropTypes.number,
  deleteObjectAction: PropTypes.func.isRequired,
  delete: PropTypes.string,
  yes: PropTypes.string,
  no: PropTypes.string,
  successfully: PropTypes.string,
}

export default DeleteButton

export const DeleteOrderItemButton = ({
  id,
  deleteObjectAction,
  delete: deleteText,
  yes,
  no,
}) => {
  return <Button size='sm'
    outline
    onClick={confirmAction(() => deleteObjectAction(id),
        `${deleteText}?`, yes, no)}>
    {deleteText}
  </Button>
}

DeleteOrderItemButton.propTypes = {
  id: PropTypes.number,
  deleteObjectAction: PropTypes.func.isRequired,
  delete: PropTypes.string,
  yes: PropTypes.string,
  no: PropTypes.string,
}

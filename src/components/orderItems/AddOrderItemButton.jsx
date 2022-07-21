import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import {useAddOrderItem} from './hooks'

const AddOrderItemButton = (props) => {
  const buttonAttrs = useAddOrderItem(props)
  return  <Button
            size='sm'
            outline
            {...buttonAttrs}
          />
}

AddOrderItemButton.propTypes = {
  props: PropTypes.object,
}

export default AddOrderItemButton

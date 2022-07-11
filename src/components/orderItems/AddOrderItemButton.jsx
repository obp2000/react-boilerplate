import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {Button} from 'reactstrap'
import orderItemsConfig from './config'

const addOrderItemButton = ({push}) => {
	const {commonConsts} = useOutletContext()
	return  <Button size='sm'
            outline
            onClick={() => orderItemsConfig.addOrderItemAction(push)}>
            {commonConsts?.add}
          </Button>
}

addOrderItemButton.propTypes = {
  push: PropTypes.func,
}

export default addOrderItemButton

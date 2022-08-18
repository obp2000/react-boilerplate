import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import {useBackButton} from './hooks'

const BackButton = (props) => {
  const buttonAttrs = useBackButton(props)
  return <Button
    color = "primary"
    outline
    size="sm"
    {...buttonAttrs} />
}

BackButton.propTypes = {
  props: PropTypes.object,
}

export default BackButton

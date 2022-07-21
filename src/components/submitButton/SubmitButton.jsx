import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import {useSubmitButton} from './hooks'

const SubmitButton = (props) => {
  const buttonAttrs = useSubmitButton(props)
  return <Button
    color="primary"
    outline
    size="sm"
    {...buttonAttrs} />
}

SubmitButton.propTypes = {
  props: PropTypes.object,
}

export default SubmitButton

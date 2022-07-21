import React from 'react'
import {Button} from 'reactstrap'
import {useBackButton} from './hooks'

const BackButton = () => {
  const buttonAttrs = useBackButton()
  return <Button
          color = "primary"
          outline
          size="sm"
          {...buttonAttrs} />
}

export default BackButton

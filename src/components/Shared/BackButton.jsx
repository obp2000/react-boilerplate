import PropTypes from 'prop-types'
import React from 'react'
import {useNavigate, useOutletContext} from 'react-router-dom'
import {Button} from 'reactstrap'

const BackButton = () => {
  const navigate = useNavigate()
  const {commonConsts} = useOutletContext()
  return <Button color = "primary"
    outline
    size="sm"
    onClick={() => navigate(-1)} >
    {commonConsts?.back}
  </Button>
}

BackButton.propTypes = {
  back: PropTypes.string,
}

export default BackButton

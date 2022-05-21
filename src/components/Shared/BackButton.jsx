import PropTypes from 'prop-types'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from 'reactstrap'

const BackButton = ({
  back,
}) => {
  const navigate = useNavigate()
  return <Button color = "primary"
    outline
    size="sm"
    onClick={() => navigate(-1)} >
    {back}
  </Button>
}

BackButton.propTypes = {
  back: PropTypes.string,
}

export default BackButton

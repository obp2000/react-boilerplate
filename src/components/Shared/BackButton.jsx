import PropTypes from 'prop-types'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {Button} from 'reactstrap'

const BackButton = ({
  back,
}) => {
  const {goBack} = useHistory()
  return <Button color = "primary" outline size="sm" onClick={() => goBack()} >
    {back}
  </Button>
}

BackButton.propTypes = {
  back: PropTypes.string,
}

export default BackButton

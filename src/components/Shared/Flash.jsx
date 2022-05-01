import React from 'react'
import {useSelector} from 'react-redux'
import {Alert} from 'reactstrap'
import FlashMessage from 'react-flash-message'

const Flash = () => {
  const loaded = useSelector(({
    errors: {
      flash,
    },
  }) => ({
    flash,
  }))
  if (!loaded.flash) {
    return null
  }
  return <FlashMessage>
    <Alert>
      {loaded.flash}
    </Alert>
  </FlashMessage>
}

export default Flash

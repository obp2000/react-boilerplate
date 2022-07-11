import PropTypes from 'prop-types'
import React from 'react'
import {useParams, useLocation} from 'react-router-dom'
import ObjectForm from './ObjectForm'
import GetObject from './GetObject'
import NotFound from '../NotFound'

const ValidateId = () => {
  const {id} = useParams()
  if (!id.match(/^\d+$/)) {return <NotFound />}
  const {state} = useLocation()
  const {object} = state || {}
  return object ? <ObjectForm {...{object}} /> : <GetObject {...{id}} />
}

export default ValidateId

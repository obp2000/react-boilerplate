import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import {useObjectMutation} from './hooks'

const ObjectForm = ({object, useObjectForm}) => {
  const formAttrs = useObjectForm(object)
  return <Form {...formAttrs} />
}

ObjectForm.propTypes = {
  object: PropTypes.object,
  useObjectForm: PropTypes.func,
}

export default ObjectForm

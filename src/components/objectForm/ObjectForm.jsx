import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import DefaultErrorPage from 'next/error'
import {useGetObject} from './hooks'

const ObjectForm = ({
  busyGettingObject,
  isErrorGettingObject,
  ...props
}) => {
  // const {
  //   busyGettingObject,
  //   isErrorGettingObject,
  //   ...formAttrs
  // } = useObjectForm()
  // if (busyGettingObject) {return <Loader />}
  if (isErrorGettingObject) {
    return <DefaultErrorPage statusCode={404} />
  }
  return <Form {...props} />
}

ObjectForm.propTypes = {
  busyGettingObject: PropTypes.bool,
  isErrorGettingObject: PropTypes.bool,
  props: PropTypes.object,
}

export default ObjectForm

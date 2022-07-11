import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import Loader from 'react-loader'
import ObjectForm from './ObjectForm'
import NotFound from '../NotFound'

const emptyObject = {}

const GetObject = ({id}) => {
  const {useGetObjectQuery} = useOutletContext()
  const {
    data: object = emptyObject,
    isFetching,
    isError
  } = useGetObjectQuery({id})
	if (isError) {return <NotFound />}
  return <Loader loaded={!isFetching}>
  	  <ObjectForm {...{object}} />
    </Loader>
}

GetObject.propTypes = {
  id: PropTypes.string,
}

export default GetObject

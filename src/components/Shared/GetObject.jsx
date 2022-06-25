import PropTypes from 'prop-types'
import React from 'react'
import Loader from 'react-loader'
import ObjectForm from './ObjectForm'
import NotFound from '../NotFound'

const GetObject = ({
  id,
  useGetObjectQuery,
  useUpdateObjectMutation,
  ...config
}) => {
  const {data: object = {}, isFetching, isError} = useGetObjectQuery({id})
	if (!isFetching && isError) {return <NotFound />}
  return <Loader loaded={!isFetching}>
  	  <ObjectForm object={object}
        useObjectMutation={useUpdateObjectMutation}
        {...config} />
    </Loader>
}

GetObject.propTypes = {
  id: PropTypes.string,
  useGetObjectQuery: PropTypes.func,
  config: PropTypes.object
}

export default GetObject

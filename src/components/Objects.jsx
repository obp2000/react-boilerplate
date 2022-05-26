import PropTypes from 'prop-types'
import React from 'react'
import {Routes, Route, useParams} from 'react-router-dom'
import ObjectsTable from './Shared/ObjectsTable'
import ObjectForm from './Shared/ObjectForm'
import NotFound from './NotFound'

const Objects = ({config}) =>
  <Routes>
    <Route index element={<ObjectsTable {...config} />} />
    <Route path=':id' element={<ValidateId {...config} />} />
    <Route path='new' element={<ObjectForm id='new' {...config} />} />
    {/* <Route path='*' element={<NotFound />} />*/}
  </Routes>

export const ValidateId = (config) => {
  const {id} = useParams()
  return id.match(/^\d+$/) ? <ObjectForm id={id} {...config} /> : <NotFound />
}

Objects.propTypes = {
  config: PropTypes.object,
}

export default Objects

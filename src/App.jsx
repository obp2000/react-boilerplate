import React from 'react'
import {Routes, Route, useParams} from 'react-router-dom'
import {Container} from 'reactstrap'
import ToastContainer from './components/Shared/ToastContainer'
import Layout from './components/Layout'
// import Objects from './components/Objects'
import customersConfig from './components/redux/Customers'
import productsConfig from './components/redux/Products'
import ordersConfig from './components/redux/Orders'
import User from './components/users/User'
import NotFound from './components/NotFound'
import ObjectsTable from './components/Shared/ObjectsTable'
import ObjectForm from './components/Shared/ObjectForm'

export const ValidateId = (config) => {
  const {id} = useParams()
  return id.match(/^\d+$/) ? <ObjectForm id={id} {...config} /> : <NotFound />
}

const App = () =>
  <Container fluid="sm" className="bg-light border">
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Objects config={customersConfig} />} />*/}
        <Route index element={<ObjectsTable {...customersConfig} />} />
        <Route path='customers'>
          <Route index element={<ObjectsTable {...customersConfig} />} />
          <Route path=':id' element={<ValidateId {...customersConfig} />} />
          <Route path='new'
            element={<ObjectForm id='new' {...customersConfig} />} />
        </Route>
        <Route path='products'>
          <Route index element={<ObjectsTable {...productsConfig} />} />
          <Route path=':id' element={<ValidateId {...productsConfig} />} />
          <Route path='new'
            element={<ObjectForm id='new' {...productsConfig} />} />
        </Route>
        <Route path='orders'>
          <Route index element={<ObjectsTable {...ordersConfig} />} />
          <Route path=':id' element={<ValidateId {...ordersConfig} />} />
          <Route path='new'
            element={<ObjectForm id='new' {...ordersConfig} />} />
        </Route>
        <Route path='user' element={<User />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Container>

export default App

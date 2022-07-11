import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Container} from 'reactstrap'
import Loader from 'react-loader'
import {useSelector} from 'react-redux'
import {selectAuth} from './components/auth/selectors'
import Layout from './components/Layout'
import customersConfig from './components/customers/config'
import productsConfig from './components/products/config'
import ordersConfig from './components/orders/config'
import User from './components/users/User'
import NotFound from './components/NotFound'
import ObjectsTable from './components/Shared/ObjectsTable'
import ObjectForm from './components/Shared/ObjectForm'
import AuthModal from './components/auth/AuthModal'
import {getOptions} from './components/options/optionsApi'
import ProtectedRoute from './components/Shared/ProtectedRoute'
import ValidateId from './components/Shared/ValidateId'
import ObjectsLayout from './components/ObjectsLayout'
import {useOptions} from './components/options/hooks'

// const ObjectsRoute = ({path, config}) =>
//   <Route  path={path} element={<ObjectsLayout {...config} />}>
//             <Route index element={<ObjectsTable />} />
//             <Route path=':id' element={<ValidateId />} />
//             <Route path='new' element={<ObjectForm />} />
//           </Route>

const App = () => {
  const [optionsTrigger, url] = getOptions.useLazyQuerySubscription()
  const optionsResult = useOptions(url)
  const {isAuthenticated} = useSelector(selectAuth)
  return <Container fluid="sm" className="bg-light border">
      {/*{!isAuthenticated && <AuthModal {...{url}} />}*/}
      <Routes>
        <Route  path="/"
                element={<Layout {...{optionsTrigger, ...optionsResult}} />}>
{/*          <Route  index
                  element={<ObjectsTable {...customersConfig} />} />*/}
          <Route  path='/'
                  element={<ObjectsLayout {...customersConfig} />}>
            <Route index element={<ObjectsTable />} />
          </Route>
          <Route  path='customers'
                  element={<ObjectsLayout {...customersConfig} />}>
            {/*<ObjectsRoutes />*/}
            <Route index element={<ObjectsTable />} />
            <Route path=':id' element={<ValidateId />} />
            <Route path='new' element={<ObjectForm />} />
          </Route>
          {/*<ObjectsRoute path='customers' config={customersConfig} />*/}
          <Route  path='products'
                  element={<ObjectsLayout {...productsConfig} />}>
            <Route index element={<ObjectsTable />} />
            <Route path=':id' element={<ValidateId />} />
            <Route path='new' element={<ObjectForm />} />
          </Route>
          <Route  path='orders'
                  element={<ObjectsLayout {...ordersConfig} />}>
            <Route index element={<ObjectsTable />} />
            <Route path=':id' element={<ValidateId />} />
            <Route path='new' element={<ObjectForm />} />
          </Route>
           <Route element={<ProtectedRoute allow={isAuthenticated} />}>
            <Route path='user' element={<User />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Container>
}

export default App

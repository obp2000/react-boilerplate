import React, {useEffect} from 'react'
import {Routes, Route, useParams, useLocation} from 'react-router-dom'
import {Container} from 'reactstrap'
import Loader from 'react-loader'
import {useSelector} from 'react-redux'
import {useLazyGetOptionsQuery} from './components/options/optionsApi'
import {useSignOutMutation} from './components/auth/authApi'
import {selectAuth} from './components/auth/selectors'
import {useLazyGetUserQuery} from './components/users/apiSlice'
// import ToastContainer from './components/Shared/ToastContainer'
import Layout from './components/Layout'
// import Objects from './components/Objects'
import customersConfig from './components/customers/config'
import productsConfig from './components/products/config'
import ordersConfig from './components/orders/config'
import User from './components/users/User'
import NotFound from './components/NotFound'
import ObjectsTable from './components/Shared/ObjectsTable'
import GetObject from './components/Shared/GetObject'
// import CreateObjectForm from './components/Shared/CreateObjectForm'
// import UpdateObjectForm from './components/Shared/UpdateObjectForm'
import ObjectForm from './components/Shared/ObjectForm'
import AuthModal from './components/auth/AuthModal'

export const ValidateId = (config) => {
  const {id} = useParams()
  const {state} = useLocation()
  return id.match(/^\d+$/) ?
    (state?.object ?
      <ObjectForm object={state.object}
        useObjectMutation={config.useUpdateObjectMutation}
        {...config} /> :
      <GetObject id={id} {...config} />) :
    <NotFound />
}

const App = () => {
  const [ optionsTrigger,
          {data: {commonConsts = {}, options = {}} = {}, ...optionsStatus}
        ] = useLazyGetOptionsQuery()
  const [signOutAction, signOutStatus = {}] = useSignOutMutation()
  const [userTrigger, {data: user = {}, ...userStatus}] = useLazyGetUserQuery()
  const {isAuthenticated} = useSelector(selectAuth)
  useEffect(() => {
    if (isAuthenticated) {userTrigger()}
  }, [isAuthenticated])
  const busy =  optionsStatus.isFetching ||
                signOutStatus.isLoading ||
                userStatus.isFetching
  return <Loader loaded={!busy} >
    <Container fluid="sm" className="bg-light border">
      <AuthModal {...{commonConsts}} />
      <Routes>
        <Route path="/" element={<Layout
          {...{commonConsts, signOutAction, user, optionsStatus}} />}>
          {/* <Route index element={<Objects config={customersConfig} />} />*/}
          <Route index element={<ObjectsTable {...customersConfig}
            {...{optionsTrigger, commonConsts, options}} />} />
          <Route path='customers'>
            <Route index element={<ObjectsTable {...customersConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
            <Route path=':id' element={<ValidateId {...customersConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
            <Route path='new' element={<ObjectForm
              useObjectMutation={customersConfig.useCreateObjectMutation}
              {...customersConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
          </Route>
          <Route path='products'>
            <Route index element={<ObjectsTable {...productsConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
            <Route path=':id' element={<ValidateId {...productsConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
            <Route path='new' element={<ObjectForm
              useObjectMutation={productsConfig.useCreateObjectMutation}
              {...productsConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
          </Route>
          <Route path='orders'>
            <Route index element={<ObjectsTable {...ordersConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
            <Route path=':id' element={<ValidateId {...ordersConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
            <Route path='new' element={<ObjectForm
              useObjectMutation={ordersConfig.useCreateObjectMutation}
              {...ordersConfig}
              {...{optionsTrigger, commonConsts, options}} />} />
          </Route>
          <Route path='user' element={<User
            {...{optionsTrigger, commonConsts, options, optionsStatus, user, userStatus}} />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Container>
  </Loader>
}

export default App

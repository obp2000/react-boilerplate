import React, {Suspense, lazy} from 'react'
import {Routes, Route, useSearchParams} from 'react-router-dom'
import {Container} from 'reactstrap'
import Loader from 'react-loader'
import {useSelector} from 'react-redux'
import {ToastContainer} from 'react-toastify'
// import './assets/css/App.scss'
// import 'numeral/locales/ru'
// import numeral from 'numeral'
import {selectAuth} from './components/auth/selectors'
import Layout from './components/Layout'
import {getOptions} from './components/options/apiSlice'
// import ProtectedRoute from './components/Shared/ProtectedRoute'
import ObjectsTable from './components/objectsTable/ObjectsTable'
import ValidateId from './components/objectForm/ValidateId'
import ObjectForm from './components/objectForm/ObjectForm'
import NotFound from './components/NotFound'
import ObjectsLayout from './components/ObjectsLayout'
import {useOptions} from './components/options/hooks'
import {useCustomersTable, useCustomerForm} from './components/customers/hooks'
import {useGetCustomerQuery} from './components/customers/apiSlice'
import {useProductsTable, useProductForm} from './components/products/hooks'
import {useGetProductQuery} from './components/products/apiSlice'
import {useOrdersTable, useOrderForm} from './components/orders/hooks'
import {useGetOrderQuery} from './components/orders/apiSlice'
import User from './components/users/User'
// const ObjectsLayout = lazy(() => import('./components/ObjectsLayout'))
// numeral.locale('ru')

// const ObjectsTable = lazy(() => import('./components/objectsTable/ObjectsTable'))
// const ValidateId = lazy(() => import('./components/objectForm/ValidateId'))
// const ObjectForm = lazy(() => import('./components/objectForm/ObjectForm'))
// const ProtectedRoute = lazy(() => import('./components/Shared/ProtectedRoute'))
// const User = lazy(() => import('./components/users/User'))
// const NotFound = lazy(() => import('./components/NotFound'))

const App = () => {
  const [optionsTrigger, url] = getOptions.useLazyQuerySubscription()
  const optionsResult = useOptions(url)
  // console.log('optionsResult ', optionsResult)
  const {isAuthenticated} = useSelector(selectAuth)
  const [searchParams, setSearchParams] = useSearchParams()
  return <Container fluid="sm" className="bg-light border">
    {/* <Suspense fallback={<Loader />}>*/}
    <Routes>
      <Route path="/"
        element={<Layout {...{
          isAuthenticated,
          optionsTrigger,
          searchParams,
          setSearchParams,
          ...optionsResult,
        }} />}>
        <Route index element={
          <ObjectsTable
            {...useCustomersTable({
              isAuthenticated,
              optionsTrigger,
              searchParams,
              setSearchParams,
              ...optionsResult})}
          />
        } />
        <Route path='customers' element={
          <ObjectsTable
            {...useCustomersTable({
              isAuthenticated,
              optionsTrigger,
              searchParams,
              setSearchParams,
              ...optionsResult})}
          />
        }>
          <Route path=':id' element={
            <ValidateId useObjectForm={useCustomerForm}
              useGetObjectQuery={useGetCustomerQuery} />
          } />
          <Route path='new' element={
            <ObjectForm useObjectForm={useCustomerForm} />
          }/>
        </Route>
        {/*            <Route  path='/'
                    element={<ObjectsLayout />}>
            {/*</Route>*/}
        {/*            <Route  path='customers'
                    element={<ObjectsLayout />}>*/}
        {/*              <Route index element={
                <ObjectsTable useObjectsTable={useCustomersTable} />
              }/>*/}
        {/*              <Route path=':id' element={
                <ValidateId useObjectForm={useCustomerForm}
                            useGetObjectQuery={useGetCustomerQuery} />
              } />
              <Route path='new' element={
                <ObjectForm useObjectForm={useCustomerForm} />
              }/>
            </Route>*/}
        <Route path='products'
          element={<ObjectsLayout />}>
          <Route index element={
            <ObjectsTable useObjectsTable={useProductsTable} />
          }/>
          <Route path=':id' element={
            <ValidateId useObjectForm={useProductForm}
              useGetObjectQuery={useGetProductQuery} />
          }/>
          <Route path='new' element={
            <ObjectForm useObjectForm={useProductForm} />
          }/>
        </Route>
        <Route path='orders'
          element={<ObjectsLayout />}>
          <Route index element={
            <ObjectsTable useObjectsTable={useOrdersTable} />
          }/>
          <Route path=':id' element={
            <ValidateId useObjectForm={useOrderForm}
              useGetObjectQuery={useGetOrderQuery} />
          } />
          <Route path='new' element={
            <ObjectForm useObjectForm={useOrderForm} />
          }/>
        </Route>
        {/* <Route element={<ProtectedRoute allow={isAuthenticated} />}>*/}
        <Route path='user' element={<User />} />
        {/* </Route>*/}
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
    {/* </Suspense>*/}
    <ToastContainer />
  </Container>
}

export default App

import {combineReducers} from 'redux'
// import { connectRouter } from 'connected-react-router'
import auth from './auth'
// import customers from './Customers'
// import products from './Products'
// import orders from './Orders'
// import errors from './Errors'
// import temp_state from './TempState'
// import commonConsts from './CommonConsts'
import {apiSlice} from '../../services/apiSlice'

const rootReducer = () => combineReducers({
  // router: connectRouter(history),
  // customers,
  // products,
  // orders,
  auth,
  // errors,
  // temp_state,
  // commonConsts,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

export default rootReducer

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import customers from './Customers'
import products from './Products'
import orders from './Orders'
import cities from './Cities'
import errors from './Errors'

const rootReducer = (history) => combineReducers({
	router: connectRouter(history),
	customers,
	products,
	orders,
	cities,
	auth,
	errors
})

export default rootReducer
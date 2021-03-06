import {
	combineReducers
} from 'redux'
import {
	reducer as formReducer
} from 'redux-form'
import {
	connectRouter
} from 'connected-react-router'
import auth from './auth'
import customers from './Customers'
import products from './Products'
import orders from './Orders'
import cities from './Cities'
// import authDialog from './AuthDialog'
import navBar from './NavBar'
import postCost from './PostCost'
import delivery_types from './DeliveryTypes'

const rootReducer = (history) => combineReducers({
	router: connectRouter(history),
	customers,
	products,
	orders,
	cities,
	form: formReducer,
	auth,
	// authDialog,
	navBar,
	postCost,
	delivery_types
})

export default rootReducer
import {
	requestDeliveryTypes,
	receiveDeliveryTypes,
} from '../../redux/DeliveryTypes'
import {
	getDeliveryTypes
} from '../ServerRequests'

export const getDeliveryTypesAction = () => dispatch => {
	dispatch(requestDeliveryTypes())
	return getDeliveryTypes()
		.then(results => dispatch(receiveDeliveryTypes(results)))
}
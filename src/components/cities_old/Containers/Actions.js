import {
	requestSearchCities,
	receiveSearchCities
} from '../../redux/Cities'
import {
	searchCities
} from '../ServerRequests'

export const onChangeCity = (obj, value) => dispatch => {
	if (typeof(value) == 'string' && value.length > 0) {
		dispatch(requestSearchCities())
		searchCities(value)
			.then(results => dispatch(receiveSearchCities(results)))
	}
}
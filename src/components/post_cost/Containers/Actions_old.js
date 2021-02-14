import {
	change
} from 'redux-form'
import {
	requestPostCost,
	receivePostCost
} from '../../redux/PostCost'
import {
	getCost
} from '../ServerRequests'

export const getPostCost = (pindex, weight) => dispatch => {
	if (weight && pindex) {
		dispatch(requestPostCost())
		return getCost(pindex, weight)
			.then(post_cost => {
				dispatch(change('order', 'post_cost', post_cost))
				dispatch(receivePostCost(post_cost))
			})
	}
}
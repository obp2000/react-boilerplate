import {
	createAction,
	createReducer
} from 'redux-act'
import fetchJsonp from 'fetch-jsonp'
import querystring from 'querystring'
import {
	change
} from 'redux-form'
import {
	BASE_URL,
	PARAMS
} from '../post_cost/Postcalc'

const requestPostCost = createAction()
const receivePostCost = createAction()

const initialState = {
	post_cost: 0
}

const reduceRequestPostCost = (state) => ({
	...state,
	isFetching: true
})

const reduceReceivePostCost = (state, post_cost) => ({
	...state,
	post_cost,
	isFetching: false
})

const postCost = createReducer({
		[requestPostCost]: reduceRequestPostCost,
		[receivePostCost]: reduceReceivePostCost,
	},
	initialState
)

export default postCost

// Server requests:

const error_handler = e => console.log(`Error: ${e}`)

const extract_post_cost = ({
	Отправления: {
		ЦеннаяПосылка: {
			Тариф
		}
	}
}) => parseInt(Тариф)

const full_url = (pindex, weight) => [BASE_URL,
	querystring.stringify({
		t: pindex,
		w: weight,
		...PARAMS
	})
].join('/?')

const getCost = (pindex, weight) => fetchJsonp(full_url(pindex, weight))
	.catch(error_handler)
	.then(response => response.json())
	.then(json => extract_post_cost(json))

// Async actions:

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
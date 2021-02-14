import fetchJsonp from 'fetch-jsonp'
import querystring from 'querystring'
import {
	BASE_URL,
	PARAMS
} from './Postcalc'

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

export const getCost = (pindex, weight) => fetchJsonp(full_url(pindex, weight))
	.catch(error_handler)
	.then(response => response.json())
	.then(json => extract_post_cost(json))
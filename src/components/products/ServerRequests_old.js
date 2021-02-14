import axios from 'axios'
import {
	objectToFormData
} from 'object-to-formdata'
import config from '../Config'
const base_url = `${config.BACKEND}/api/products`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
	data
}) => data

const extract_products = ({
	data: {
		results = []
	} = {}
}) => results

export const getProducts = (page, term) => axios.get(`${base_url}/`, {
		params: {
			page,
			// term
			term: decodeURIComponent(term)
		}
	})
	.catch(error_handler)
	.then(extract_data)

export const getProduct = (id) => axios.get(`${base_url}/${id}`)
	.catch(error_handler)
	.then(extract_data)

export const createOrUpdateProduct = (id, data) => axios({
		url: `${base_url}/${id ? id + '/' : ''}`,
		method: id ? 'PUT' : 'POST',
		data: objectToFormData(data)
	})
	.catch(error_handler)
	.then(extract_data)

export const deleteProduct = (id) => axios.delete(`${base_url}/${id}`)
	.catch(error_handler)

export const searchProducts = (term) => axios.get(`${base_url}/`, {
		params: {
			term: decodeURIComponent(term),
			page_size: 1000000
		}
	})
	.catch(error_handler)
	.then(extract_products)

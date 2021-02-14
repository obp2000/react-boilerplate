import axios from 'axios'
import config from '../Config'
const base_url = `${config.BACKEND}/api/cities`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
	data
}) => data

export const searchCities = (term) => axios.get(`${base_url}/`, {
		params: {
			term
		}
	})
	.catch(error_handler)
	.then(extract_data)
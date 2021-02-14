import axios from 'axios'
import config from '../Config'
const base_url = `${config.BACKEND}/api/delivery_types`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
	data
}) => data

export const getDeliveryTypes = () => axios.get(base_url)
	.catch(error_handler)
	.then(extract_data)

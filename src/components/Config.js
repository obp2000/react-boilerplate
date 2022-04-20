import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/api',
})

const config = Object.freeze({
	BACKEND: "http://127.0.0.1:8000",
	BaseTable: 'customers'
})

export default config
export const selectKeys = (values, keys) =>
	keys.reduce((result, key) => {
		result[key] = values[key]
		return result
	}, {})
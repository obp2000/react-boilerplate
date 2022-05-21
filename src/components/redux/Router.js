export const getTableLabels = (
    fieldNames = [],
    options = {},
) => fieldNames.reduce((result, fieldName) => {
  result.push(options[fieldName]?.label)
  return result
}, [])

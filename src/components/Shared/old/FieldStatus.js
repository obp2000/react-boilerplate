export const invalid = ({visited, error}) => (visited && !!error ? true : null)

export const valid = ({visited, error}) => (visited && !error ? true : null)

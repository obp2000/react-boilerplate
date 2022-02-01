export const invalid = ({ touched, error }) => touched && !!error ? true : null

export const valid = ({ touched, error }) => touched && !error ? true : null
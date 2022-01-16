import { push } from 'connected-react-router'

export const submitAction = (term, table) => push(`/${table}?term=${term}`)
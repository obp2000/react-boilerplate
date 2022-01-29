import { push } from 'connected-react-router'
import querystring from 'querystring'
import { TableName } from '../Shared/BasePathname'

export const onSubmit = (dispatch, pathname) => ({ term }) =>
    dispatch(push(`/${TableName(pathname)}?${querystring.stringify({term})}`))
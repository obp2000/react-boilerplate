// import { push } from 'connected-react-router'
import querystring from 'querystring';

export const onSubmit = (dispatch, pathname) => ({ term }) => dispatch(push(`${pathname}?${querystring.stringify({ term })}`));

import { FORM_ERROR } from 'final-form';
// import { receiveErrors } from './Errors'
// import { failedRequest } from './TempState'

export const errorHandler44 = (e) => {
  const {
    message,
    response: {
      data = {},
    } = {},
  } = e;
  // dispatch(failedRequest())
  console.error('e: ', e);
  let error_messsages = ['Ошибка!'];
  if (Object.keys(data).length != 0) {
    error_messsages = [];
    Object.keys(data).slice(0, 50).map((key, index) => error_messsages.push(`${key}: ${data[key]}`));
    // error_messsages = Object.values(data).flat()
  } else if (message) {
    error_messsages = [message.substring(0, 100)];
  } else if (e.toJSON().message) {
    error_messsages = [e.toJSON().message];
  }
  // failedAction && dispatch(failedAction())
  // return dispatch(receiveErrors(error_messsages))
};

export const errorHandler = (dispatch, failedAction) => (e) => {
  const {
    message,
    response: {
      data = {},
    } = {},
  } = e;
  // dispatch(failedRequest())
  console.error('e: ', e);
  let error_messsages = ['Ошибка!'];
  if (Object.keys(data).length != 0) {
    error_messsages = [];
    Object.keys(data).slice(0, 50).map((key, index) => error_messsages.push(`${key}: ${data[key]}`));
    // error_messsages = Object.values(data).flat()
  } else if (message) {
    error_messsages = [message.substring(0, 100)];
  } else if (e.toJSON().message) {
    error_messsages = [e.toJSON().message];
  }
  failedAction && dispatch(failedAction());
  // return dispatch(receiveErrors(error_messsages))
};

export const formErrorHandler = (dispatch, failedAction) => (e) => {
  console.error(e);
  const {
    message,
    response: {
      data = {},
    } = {},
  } = e;
  // dispatch(failedRequest())
  dispatch(failedAction());
  // const data_errors = Object.values(data).flat()
  // dispatch(failedAction(data_errors || [message]))
  // dispatch(receiveErrors(data_errors || [message]))
  return {
    [FORM_ERROR]: Object.values(data).flat(),
  };
};

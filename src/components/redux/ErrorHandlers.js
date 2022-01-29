import { FORM_ERROR } from 'final-form'
import { receiveErrors } from './Errors'

export const errorHandler = (dispatch, failedAction) => e => {
    const {
        message,
        response: {
            data = {}
        } = {}
    } = e
    // console.log('e: ', e)
    let error_messsages = ['Ошибка!']
    if (Object.keys(data).length != 0) {
        error_messsages = Object.values(data).flat()
    } else if (message) {
        error_messsages = [message]
    } else if (e.toJSON().message) {
        error_messsages = [e.toJSON().message]
    }
    dispatch(receiveErrors(error_messsages))
    return dispatch(failedAction())
}

// export const errorHandler1 = (dispatch, failedAction) => e => {
//     console.error(e)
//     const {
//         message,
//         response: {
//             data = {}
//         } = {}
//     } = e
//     dispatch(failedAction(data || [message]))
//     // const { non_field_errors = [], ...field_errors } = data
//     // const { errors_obj } = data
//     console.log('field_errors: ', Object.values(data).flat())
//     // console.log('non_field_errors: ', non_field_errors)
//     return {
//         [FORM_ERROR]: Object.values(data).flat()
//     }
// }


export const formErrorHandler = (dispatch, failedAction) => e => {
    console.error(e)
    const {
        message,
        response: {
            data = {}
        } = {}
    } = e
    // console.log('data: ', data )
    const data_errors = Object.values(data).flat()
    dispatch(failedAction(data_errors || [message]))
    // dispatch(receiveErrors(data_errors || [message]))
    return {
        [FORM_ERROR]: data_errors
    }
}




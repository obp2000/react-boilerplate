import { FORM_ERROR } from 'final-form'

export const errorHandler = (dispatch, failedAction) => e => {
    const {
        message,
        response: {
            data = {}
        } = {}
    } = e
    return dispatch(failedAction(Object.values(data).flat() || [message]))
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
    dispatch(failedAction(Object.values(data).flat() || [message]))
    return {
        [FORM_ERROR]: Object.values(data).flat()
    }
}




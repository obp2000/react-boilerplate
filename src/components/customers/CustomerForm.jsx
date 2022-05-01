import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import Loader from 'react-loader'
import { Form } from 'react-final-form'
import { toast } from 'react-toastify'
import createDecorator from 'final-form-submit-listener'
import { validate } from './Validators'
import CustomerFormRender from './CustomerFormRender'
import { config } from '../redux/Customers'
import {
    useGetOptionsQuery,
    useGetObjectQuery,
    useCreateObjectMutation,
    useUpdateObjectMutation,
    useGetObjectsQuery
} from '../../services/apiSlice'
import { selectAuth } from '../redux/auth'
import { Error } from '../Shared/Errors'
// import { apiSlice } from '../../services/apiSlice'

const submitListener = createDecorator({
    beforeSubmit: form => {
        // console.log('form ', form.getState().values)
        config.preSubmitAction(form.getState().values)
    }
})
const CustomerForm = () => {
    const url = config.indexUrl
    const { isAuthenticated } = useSelector(selectAuth)
    const {
        data: {
            commonConsts,
            options
        } = {},
        isError: isOptionsError,
        error: optionsError
    } = useGetOptionsQuery(url)
    const { id } = useParams()
    const isNewObject = id == 'new'
    // const accessToken = auth?.accessToken
    // if (!isNewObject) {
    //     console.log("useGetObjectsQuery": useGetObjectsQuery)
    // }
    const {
        data: object = {},
        // isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = isNewObject ? {} : useGetObjectQuery({ url, id: parseInt(id) })
    const [
        createOrUpdateObject,
        {
            isLoading,
            data: updatedObject,
            isSuccess: isSuccessMutation
        }
    ] = isNewObject ? useCreateObjectMutation() : useUpdateObjectMutation()
    return <Loader loaded={!isFetching && !isLoading}>
        {isSuccessMutation && isNewObject && <Redirect to={config.redirectUrl} />}
        <Form   name='customer'
                validate={validate(commonConsts?.error_messages)}
                onSubmit={values => createOrUpdateObject({...values, url}).unwrap()
                            .then(() => {toast.dismiss()
                                         toast.success(commonConsts?.successfully)})
                            .catch(({ data }) => toast.error(data.detail, {autoClose: false}))
                        }
                initialValues={object}
                decorators={[ submitListener ]}
                render={CustomerFormRender}
                {...{...commonConsts, isSuccessMutation, options}}
                />
    </Loader>
}

export default CustomerForm


// console.log('object ', object)


// id = (id == 'new') ? '' : `${id}/`
// const url = `${Actions.indexUrl}${id}`
// const { isAuthenticated, accessToken } = useSelector(selectAuth)
// const options_config = { url, params: { isAuthenticated } }
// const object_config = { url, ...tokenHeaders(accessToken) }
// console.log('params ', params)
// console.log('commonConsts.status ', commonConsts.status)
// console.log('customersSlice.status ', customersSlice.status)
// console.log('Actions.index_ur ', Actions.index_ur)
// const getOptionsAction = getOptionsThunk(Actions.indexUrl)
// const getObjectAction = getObjectThunk(Actions.indexUrl)
// const createOrUpdateObjectAction = createOrUpdateObjectThunk(Actions)

// console.log('render')

// useEffect(() => {
//     // const idle1 = idle
//     if (idle) {
//         // console.log('useEffect getOptionsAction ', id)
//         dispatch(getOptionsAction())
//         // if (objects_status === 'idle') {
//             id ? dispatch(getObjectAction(id)) :
//                 dispatch(Actions.resetObject())
//         // }
//     }

//     // if (id) {
//     //     //     console.log('useEffect ex getObjectAction')
//     //     if (idle)
//     //         dispatch(getObjectAction(object_config))
//     // } else {
//     //     console.log('useEffect new getObjectAction')
//     //     dispatch(Actions.resetObject())
//     // }
// }, [search, dispatch])

// if (id) {
//     useEffect(() => {
//         if (idle)
//             console.log('useEffect ex getObjectAction')
//             dispatch(getObjectAction(object_config))
//     }, [location, dispatch])
// } else {
//     useEffect(() => {
//         console.log('useEffect new getObjectAction')
//         dispatch(Actions.resetObject())
//         // console.log('reset')
//     }, [location, dispatch])
// }




// useEffect(() => {
//     if (id) {
//         if (customers_status === 'idle')
//             dispatch(getObjectAction(object_config))
//     } else {
//         // dispatch(Actions.resetObject())
//         // console.log('reset')
//     }
// }, [dispatch])

// if (id) {
//     useEffect(() => {
//         if (id) {
//             if (customers_status === 'idle')
//                 dispatch(getObjectAction(object_config))
//         } else {
//             // dispatch(Actions.resetObject())
//             // console.log('reset')
//         }
//     }, [dispatch])
//     } else {
//     useEffect(() => {
//         dispatch(Actions.resetObject())
//         console.log('reset')
//     }, [dispatch])
// }
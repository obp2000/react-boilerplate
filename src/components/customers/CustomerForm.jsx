import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation, Redirect } from 'react-router-dom'
import Loader from 'react-loader'
import { Form } from 'react-final-form'
import { toast } from 'react-toastify'
import createDecorator from 'final-form-submit-listener'
import { validate } from './Validators'
import CustomerFormRender from './CustomerFormRender'
import { selectErrorMessages, getOptionsThunk } from '../redux/CommonConsts'
import { Actions, selectSlice } from '../redux/Customers'
// import {
//     // getObjectAction,
//     onSubmitAction
// }
// from '../redux/ServerActions'
// import { selectAuth, tokenHeaders } from '../redux/auth'
import { selectCommonConsts } from '../redux/CommonConsts'
import { getObjectThunk } from '../redux/CommonActions'

import {
    useCommonConsts,
    useOptions,
    useGetObjectQuery,
    useCreateObjectMutation,
    useUpdateObjectMutation
} from '../../services/apiSlice'
import { selectAuth } from '../redux/auth'
import { Error } from '../Shared/Errors'


// import MakeAsyncFunction from 'react-redux-promise-listener'

const submitListener = createDecorator({
    beforeSubmit: form => {
        // console.log('form ', form.getState().values)
        Actions.pre_submit_action(form.getState().values)
    }
})

const CustomerForm = () => {
    const url = '/customers/'
    const auth = useSelector(selectAuth)
    const common_consts = useCommonConsts({
        url,
        params: {
            isAuthenticated: auth?.isAuthenticated
        }
    })
    // const dispatch = useDispatch()
    // const common_consts_status = common_consts.status
    // const objects_status = useSelector(selectSlice).status
    // const idle = common_consts_status === 'idle' && objects_status === 'idle'
    const { id } = useParams()

    const accessToken = auth?.accessToken
    const existing_object = id.match(/\d+/)
    const {
        data: object = {},
        // isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = existing_object ?
        useGetObjectQuery({
            url,
            id,
            accessToken
        }) : {}
    const [
        createOrUpdateObject,
        {
            isLoading,
            data: updatedObject,
            isSuccess: isSuccessMutation
        }
    ] = (existing_object ? useUpdateObjectMutation() : useCreateObjectMutation())
    if (isSuccessMutation) {
        toast.success(common_consts.successfully)
        // console.log('updatedObject ', updatedObject)
        // dispatch(Actions.successUpdateObject(updatedObject))
    }
    // console.log('error ', error?.data)

    return <Loader loaded={!isFetching && !isLoading}>
        {isError && <Error message={JSON.stringify(error.data)} />}
        {/*{isSuccessMutation && <Redirect to={Actions.redirect_url} />}*/}
        <Form   name='customer'
                validate={validate(common_consts.error_messages)}
                onSubmit={values => {
                    // Actions.pre_submit_action(values)
                    return createOrUpdateObject({...values, url, accessToken})
                }}
                initialValues={object}
                decorators={[ submitListener ]}
                render={CustomerFormRender}
                {...common_consts}
                />
    </Loader>
}

export default CustomerForm


// console.log('object ', object)


// id = (id == 'new') ? '' : `${id}/`
// const url = `${Actions.index_url}${id}`
// const { isAuthenticated, accessToken } = useSelector(selectAuth)
// const options_config = { url, params: { isAuthenticated } }
// const object_config = { url, ...tokenHeaders(accessToken) }
// console.log('params ', params)
// console.log('common_consts.status ', common_consts.status)
// console.log('customersSlice.status ', customersSlice.status)
// console.log('Actions.index_ur ', Actions.index_ur)
// const getOptionsAction = getOptionsThunk(Actions.index_url)
// const getObjectAction = getObjectThunk(Actions.index_url)
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
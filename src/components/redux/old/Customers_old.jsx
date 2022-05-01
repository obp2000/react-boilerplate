import { createAction, createReducer } from 'redux-act'
// import axios from 'axios'
// import { push } from 'connected-react-router'
// import { reduxForm } from 'redux-form'
// import { connect } from 'react-redux'
// import pickKeys from 'json-pick-keys'
import { initCity } from './Cities'
// import { tokenHeaders } from './auth'
import config from '../Config'
// import { validate } from '../customers/Validators'
import {
    init_objects_info,

    // reduceRequestObjects,
    // reduceReceiveObjects,
    buildGetObjectsAction,
    // get_reducer_actions,

    // reduceRequestObject,
    // reduceReceiveObject,
    buildGetObjectAction,

    // reduceRequestUpdateObject,
    // reduceReceiveUpdateObject,
    buildOnSubmitAction,

    // reduceRequestDeleteObject,
    // reduceReceiveDeleteObject,
    buildDeleteObjectAction,

    // reduceRequestSearchObjects,
    // reduceRecieveSearchObjects,
    builSearchObjectsAction,
    buildReducer,
} from './common_actions'

const base_url = `${config.BACKEND}/api/customers`

export const initObject = {
    nick: '',
    name: '',
    city: initCity,
    address: ''
}

const initialState = {
    ...init_objects_info,
    isFetching: false,
    didInvalidate: false,
    loaded: false,
    object: initObject,
    search_results: []
}

const redirectUrl = '/customers'

// var reducer_actions = {}

// Get collection

// const requestObjects = createAction()

// reducer_actions[requestObjects] = reduceRequestObjects

// const receiveObjects = createAction()

// reducer_actions[receiveObjects] = reduceReceiveObjects

export const getObjectsAction = buildGetObjectsAction({
    // requestObjects,
    // receiveObjects,
    base_url
})

// reducer_actions = get_reducer_actions()

// Get object

// const requestObject = createAction()

// reducer_actions[requestObject] = reduceRequestObject(initObject)

// const receiveObject = createAction()

// reducer_actions[receiveObject] = reduceReceiveObject(initObject)

export const getObjectAction = buildGetObjectAction({
    // requestObject,
    // receiveObject,
    base_url
})

// Create or update object


// const requestUpdateObject = createAction()

// reducer_actions[requestUpdateObject] = reduceRequestUpdateObject

// const receiveUpdateObject = createAction()

// reducer_actions[receiveUpdateObject] = reduceReceiveUpdateObject

export const onSubmit = buildOnSubmitAction({
    // requestUpdateObject,
    // receiveUpdateObject,
    base_url,
    redirectUrl
})

// Delete object

// const requestDeleteObject = createAction()

// reducer_actions[requestDeleteObject] = reduceRequestDeleteObject

// const receiveDeleteObject = createAction()

// reducer_actions[receiveDeleteObject] = reduceReceiveDeleteObject

export const deleteObjectAction = buildDeleteObjectAction({
    // requestDeleteObject,
    // receiveDeleteObject,
    base_url
})

// Search objects

// const requestSearchObjects = createAction()

// reducer_actions[requestSearchObjects] = reduceRequestSearchObjects

// const receiveSearchObjects = createAction()

// reducer_actions[receiveSearchObjects] = reduceRecieveSearchObjects

export const onSearchCustomer = builSearchObjectsAction({
    // requestSearchObjects,
    // receiveSearchObjects,
    base_url
})

// Create reducer

export default buildReducer(initialState)

// export default createReducer(reducer_actions, initialState)
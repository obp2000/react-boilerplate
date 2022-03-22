import { createReducer } from 'redux-act'
import config from '../Config'
import { createActions, reducerActions, initialState } from './CommonActions'

export const initCity = {
    city: '',
    pindex: ''
}

export const initObject = {
    nick: '',
    name: '',
    city: initCity,
    address: ''
}

const index_url = '/customers'
const redirect_url = '/customers'
const pre_submit_action = values => {
    if (values.city) {
        values.city_id = values.city.id
        delete values.city
    }
    delete values.options
    delete values.created_at
    delete values.updated_at
}

export const Actions = createActions()

export default createReducer(reducerActions(Actions, initObject),
                             initialState(initObject))

Actions.index_url = index_url
Actions.base_url = `${config.BACKEND}/api${index_url}`
Actions.redirect_url = redirect_url
Actions.initObject = initObject
Actions.pre_submit_action = pre_submit_action
Actions.search_url = index_url


// export Actions

// export const Actions = new CommonActions({
//     index_url,
//     redirect_url,
//     initObject,
//     pre_submit_action
// })

// export const getObjectsAction = getObjectsAction1(Actions)
// export const getObjectAction = getObjectAction1(Actions)
// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearch = Actions.searchObjectsAction()
// export const onBlur = Actions.clearSearchObjectsAction()
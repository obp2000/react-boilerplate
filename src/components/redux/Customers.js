import { initObject as initCity } from './Cities'
// import config from '../Config'

import { CommonActions } from './common_actions2'

// const base_url = `${config.BACKEND}/api/customers`

export const initObject = {
    nick: '',
    name: '',
    city: initCity,
    address: ''
}

const index_url = '/customers'
const redirect_url = '/customers'

const Actions = new CommonActions({index_url, redirect_url, initObject})

export const getObjectsAction = Actions.getObjectsAction()
export const getObjectAction = Actions.getObjectAction()
export const onSubmit = Actions.onSubmitAction()
export const deleteObjectAction = Actions.deleteObjectAction()
export const onSearchCustomer = Actions.searchObjectsAction()

export default Actions.getReducer()
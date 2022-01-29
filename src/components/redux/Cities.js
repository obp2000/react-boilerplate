import { CommonActions } from './CommonActions'

export const initObject = {
    city: '',
    pindex: ''
}

const index_url = '/cities'
const redirect_url = '/cities'

export const Actions = new CommonActions({index_url, redirect_url, initObject})

export default Actions.getReducer()
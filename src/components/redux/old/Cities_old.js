import {CommonActions} from './CommonActions'

export const initObject = {
  city: '',
  pindex: '',
}

const indexUrl = '/cities'
const redirectUrl = '/cities'

export const Actions = new CommonActions({indexUrl, redirectUrl, initObject})

export default Actions.getReducer()

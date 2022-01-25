import { CommonActions } from './common_actions2'

export const initObject = {
    city: '',
    pindex: ''
}

const index_url = '/cities'
const redirect_url = '/cities'

const Actions = new CommonActions({index_url, redirect_url, initObject})

export const onSearch = Actions.searchObjectsAction()

export const onBlur = Actions.clearSearchObjectsAction()

export default Actions.getReducer()
import { CommonActions } from './CommonActions'

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
    // if (values.city) {
    //     values.city = values.city.id
    // }
    delete values.pindex
    delete values.created_at
    delete values.updated_at
}

export const Actions = new CommonActions({
    index_url,
    redirect_url,
    initObject,
    pre_submit_action
})

export default Actions.getReducer()



// export const getObjectsAction = getObjectsAction1(Actions)
// export const getObjectAction = getObjectAction1(Actions)
// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearch = Actions.searchObjectsAction()
// export const onBlur = Actions.clearSearchObjectsAction()
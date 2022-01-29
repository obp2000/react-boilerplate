import { CommonActions } from './CommonActions'

export const initObject = {
    id: null,
    name: '',
    price: null,
    density: null,
    weight: null,
    width: null,
    density: null,
    dollar_price: null,
    dollar_rate: null,
    width_shop: null,
    density_shop: null,
    weight_for_count: null,
    length_for_count: null,
    price_pre: null,
    image: null
}

const index_url = '/products'
const redirect_url = '/products'
const to_form_data = true
const pre_submit_action = values => {
    // console.log('values: ', values, typeof(values.image))
    if (values.new_image) {
        values.image = values.new_image
    } else {
        delete values.image
    }
    delete values.new_image
}

export const Actions = new CommonActions({
    index_url,
    redirect_url,
    initObject,
    to_form_data,
    pre_submit_action
})

// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearch = Actions.searchObjectsAction()
// export const onBlur = Actions.clearSearchObjectsAction()

export default Actions.getReducer()
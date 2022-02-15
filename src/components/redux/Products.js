import { createReducer } from 'redux-act'
import { CommonActions, getReducerActions, getInitialState } from './CommonActions'


export const initObject = {
    id: null,
    product_type: null,
    threads: null,
    contents: null,
    fleece: null,
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
    if (values.new_image) {
        values.image = values.new_image
    } else {
        delete values.image
    }
    delete values.new_image
    if (values.product_type) {
        values.product_type_id = values.product_type
        delete values.product_type
    }
    delete values.product_type_options
    delete values.get_product_type_display
    delete values.threads_options
    delete values.get_threads_display
    delete values.contents_options
    delete values.get_contents_display
    delete values.prices
    delete values.density_for_count
    delete values.meters_in_roll
    delete values.created_at
    delete values.updated_at
    // console.log('values: ', values)
}

// const choices_names = [
//     ['product_type_options', 'product_type'],
//     ['threads_options', 'threads'],
//     ['contents_options', 'contents']
// ]

export const Actions = new CommonActions({
    index_url,
    redirect_url,
    initObject,
    to_form_data,
    pre_submit_action,
    // choices_names
})

// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearch = Actions.searchObjectsAction()
// export const onBlur = Actions.clearSearchObjectsAction()

// export default Actions.getReducer()
export default createReducer(Actions.getReducerActions(), Actions.getInitialState())
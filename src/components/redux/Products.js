import { createReducer } from 'redux-act'
import { createSelector } from 'reselect'
import config from '../Config'
import { createActions, reducerActions, initialState } from './CommonActions'
import { selectOptions } from './CommonConsts'
import blank from '../../assets/img/blank.png'
import { selectConsts } from './CommonConsts'
import ProductName from '../products/ProductName'

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
    delete values.Consts
}

export const Actions = createActions()

export default createReducer(reducerActions(Actions, initObject),
    initialState(initObject))

Actions.index_url = index_url
Actions.base_url = `${config.BACKEND}/api${index_url}`
Actions.redirect_url = redirect_url
Actions.initObject = initObject
Actions.pre_submit_action = pre_submit_action
Actions.to_form_data = to_form_data
Actions.search_url = index_url

export const selectImage = ({
    products: {
        object: {
            image
        } = {}
    }
}) => image || String(blank)

export const selectObject = ({
    products: {
        object
    }
}) => object

export const selectFormInitialValues =
    createSelector([selectObject, selectConsts],
        (object, Consts) => ({ ...object, Consts })
    )

export const selectObjects = ({
    products: {
        results = {}
    } = {}
}) => results

export const selectProductLabels = selectProductProps =>
    createSelector([selectProductProps],
        ({
            fleece = {}
        }) => {
            const {
                label: fleece_label = ''
            } = fleece
            return {
                fleece_label: fleece_label.toLowerCase()
            }
        }
    )

export const selectTableValues =
    createSelector([selectObjects, selectProductLabels(selectOptions)],
        (objects, product_labels) => objects.reduce((result, object) => {
                result.push({
                    id: object.id,
                    name: ProductName(object, product_labels),
                    price: object.price,
                    width: object.width,
                    density: object.density,
                    created_at: object.created_at,
                    updated_at: object.updated_at
                })
                return result
            }, [])
    )

export const selectTableLabels =
    createSelector([selectOptions], ({
        id = {},
        name = {},
        price = {},
        width = {},
        density = {},
        created_at = {},
        updated_at = {}
    }) => [
        id.label,
        name.label,
        price.label,
        width.label,
        density.label,
        created_at.label,
        updated_at.label
    ])

export const selectTotalCount = ({
    products: {
        totalCount = 0
    } = {}
}) => totalCount

export const selectTotalPages = ({
    products: {
        totalPages = 0
    } = {}
}) => totalPages


// export const Actions = new CommonActions({
//     index_url,
//     redirect_url,
//     initObject,
//     to_form_data,
//     pre_submit_action,
//     // choices_names
// })

// export default createReducer(Actions.getReducerActions(), Actions.getInitialState())

// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearch = Actions.searchObjectsAction()
// export const onBlur = Actions.clearSearchObjectsAction()

// export default Actions.getReducer()
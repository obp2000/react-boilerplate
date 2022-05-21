import createDecorator from 'final-form-submit-listener'
import productName from '../products/ProductName'
import ProductFormRender from '../products/ProductFormRender'
import {validate} from '../products/Validators'
import {calculator} from '../products/Calculator'

const indexUrl = '/products/'

const redirectUrl = '/products/'

const searchUrl = indexUrl

const preSubmitAction = (values) => {
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
  delete values.PriceCoeffs
  values.toFormData = true
  // values = objectToFormData(values)
}

const tableFieldNames = [
  'id',
  'name',
  'price',
  'width',
  'density',
  'created_at',
  'updated_at',
]

const rowData = (object, options) => [
  object.id,
  productName(object, options),
  object.price,
  object.width,
  object.density,
  object.created_at,
  object.updated_at,
]

const formInitialValues = (object, {Consts} = {}) =>
  ({...object, ...Consts})

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    // console.log('pre.....')
    preSubmitAction(form.getState().values)
  }
})

const config = {
  indexUrl,
  redirectUrl,
  decorators: [calculator, submitListener],
  searchUrl,
  tableFieldNames,
  rowData,
  ObjectFormRender: ProductFormRender,
  validate,
  formInitialValues
}

export const productLabels = ({fleece}) =>
  ({fleeceLabel: fleece?.label.toLowerCase()})

export default config


// export const Actions = new CommonActions({
//     indexUrl,
//     redirectUrl,
//     initObject,
//     to_form_data,
//     preSubmitAction,
//     // choices_names
// })

// export default createReducer(Actions.getReducerActions(),
//    Actions.getInitialState())

// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearch = Actions.searchObjectsAction()
// export const onBlur = Actions.clearSearchObjectsAction()

// export default Actions.getReducer()

// const config = {
//     initObject,
//     indexUrl
// }

// console.log('test1 ', createCommonSlice)

// const Slice = createCommonSlice(initObject)
// export const Actions = {}
// export default Slice.reducer

// export const Actions = createActions()

// export default createReducer(reducerActions(Actions, initObject),
//     initialState(initObject))

// Actions.indexUrl = indexUrl
// Actions.base_url = `${config.BACKEND}/api${indexUrl}`
// Actions.redirectUrl = redirectUrl
// const searchUrl = indexUrl
// Actions.initObject = initObject
// Actions.preSubmitAction = preSubmitAction
// Actions.to_form_data = to_form_data
// Actions.searchUrl = indexUrl

// export const selectImage = ({
//     products: {
//         object: {
//             image
//         } = {}
//     }
// }) => image || String(blank)

// export const selectObject = ({
//     products: {
//         object
//     }
// }) => object

// export const selectFormInitialValues =
//     createSelector([selectObject, selectConsts],
//         (object, Consts) => ({ ...object, Consts })
//     )

// export const selectObjects = ({
//     products: {
//         results = {}
//     } = {}
// }) => results

// export const selectProductLabels = selectProductProps =>
//     createSelector([selectProductProps],
//         ({
//             fleece = {}
//         }) => {
//             const {
//                 label: fleece_label = ''
//             } = fleece
//             return {
//                 fleece_label: fleece_label.toLowerCase()
//             }
//         }
//     )

// export const selectTableLabels =
//     createSelector([useOptions], ({
//         id = {},
//         name = {},
//         price = {},
//         width = {},
//         density = {},
//         created_at = {},
//         updated_at = {}
//     }) => [
//         id.label,
//         name.label,
//         price.label,
//         width.label,
//         density.label,
//         created_at.label,
//         updated_at.label
//     ])

// export const selectTableValues = results =>
//     createSelector([
//             selectProductLabels(useOptions),
//             selectTableLabels
//         ],
//         (
//             product_labels,
//             table_labels
//         ) => results.reduce((result, object) => {
//             result.push({
//                 id: object.id,
//                 name: productName(object, product_labels),
//                 price: object.price,
//                 width: object.width,
//                 density: object.density,
//                 created_at: object.created_at,
//                 updated_at: object.updated_at
//             })
//             return result
//         }, [table_labels])
//     )

// export const selectImageProps = createSelector([useOptions],
//     ({ image = {} }) => image)

// export const getTableLabels = ({
//     id = {},
//     name = {},
//     price = {},
//     width = {},
//     density = {},
//     created_at = {},
//     updated_at = {}
// }) => [id.label,
//     name.label,
//     price.label,
//     width.label,
//     density.label,
//     created_at.label,
//     updated_at.label
// ]

// export const initObject = {
//     id: null,
//     product_type: null,
//     threads: null,
//     contents: null,
//     fleece: null,
//     name: '',
//     price: null,
//     density: null,
//     weight: null,
//     width: null,
//     density: null,
//     dollar_price: null,
//     dollar_rate: null,
//     width_shop: null,
//     density_shop: null,
//     weight_for_count: null,
//     length_for_count: null,
//     price_pre: null,
//     image: null
// }

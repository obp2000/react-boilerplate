import createDecorator from 'final-form-submit-listener'
// import fetchJsonp from 'fetch-jsonp'
// import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {shortName} from '../customers/CustomerName'
import cityName from '../cities/CityName'
import {cityLabels} from './Cities'
import CustomerFormRender from '../customers/CustomerFormRender'
import {validate} from '../customers/Validators'

const indexUrl = '/customers/'

const redirectUrl = '/customers/'

const searchUrl = indexUrl

const preSubmitAction = (values) => {
  if (values.city) {
    values.city_id = values.city.id
    delete values.city
  }
  delete values.options
  delete values.created_at
  delete values.updated_at
}

const tableFieldNames = [
  'id',
  'name',
  'city',
  'address',
  'created_at',
]

export const customerLabels = ({
  name,
  address,
} = {}) => ({
  nameLabel: `${name?.label}:`,
  addressLabel: `${address?.label}:`,
})

const rowData = (object = {}, options) => ([
  object.id,
  shortName(object, customerLabels(options)),
  cityName(object.city, cityLabels(options?.city?.children)),
  object.address,
  object.created_at,
])

const formInitialValues = (object) => object

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    // console.log('pre.....')
    preSubmitAction(form.getState().values)
  }
})

const config = {
  indexUrl,
  redirectUrl,
  decorators: [submitListener],
  searchUrl,
  tableFieldNames,
  rowData,
  ObjectFormRender: CustomerFormRender,
  validate,
  formInitialValues,
  // mutators: {mutator1}
}

export default config

// const Slice = createCommonSlice(initObject)

// export default Slice.reducer

// console.log('Actions: ', Actions)

// export const Actions = createActions()

// export default createReducer(reducerActions(Actions, initObject),
//     initialState(initObject))

// export const selectCityProps =
//     createSelector([useOptions], ({
//         city: {
//             children = {}
//         } = {}
//     }) => children)

// export const selectObject =
//     createSelector([selectSlice], ({
//         object
//     }) => object)

// export const selectObjects =
//     createSelector([selectSlice], ({
//         results
//     }) => results)

// export const selectTableLabels =
//     createSelector([useOptions], ({
//         id = {},
//         name = {},
//         city = {},
//         address = {},
//         created_at = {}
//     }) => [
//         id.label,
//         name.label,
//         city.label,
//         address.label,
//         created_at.label
//     ])

// export const selectTableValues = results =>
//     createSelector([
//             selectCustomerLabels(useOptions),
//             selectShortLabels(selectCityProps),
//             selectTableLabels
//         ],
//         (
//             customer_labels,
//             city_labels,
//             table_labels
//         ) => results.reduce((result, object) => {
//             result.push({
//                 id: object.id,
//                 name: ShortName(object, customer_labels),
//                 city: CityName(object.city, city_labels),
//                 address: object.address,
//                 created_at: object.created_at,
//             })
//             return result
//         }, [table_labels])
//     )

// export const getTableLabels = ({
//     id = {},
//     name = {},
//     city = {},
//     address = {},
//     created_at = {}
// }) => [id.label,
//     name.label,
//     city.label,
//     address.label,
//     created_at.label
// ]

// export const selectCustomerLabels = selectCustomerProps =>
//     createSelector([selectCustomerProps],
//         ({
//             name: {
//                 label: name_label = ''
//             } = {},
//             address: {
//                 label: address_label = ''
//             } = {}
//         }) => ({
//             name_label: `${name_label}:`,
//             address_label: `${address_label}:`
//         })
//     )

// export const selectSlice = ({ customers }) => customers

// export const initCity = {
//     city: '',
//     pindex: ''
// }

// export const initObject = {
//     nick: '',
//     name: '',
//     city: initCity,
//     address: ''
// }

// Actions.initObject = initObject
// Actions.indexUrl = indexUrl
// Actions.redirectUrl = redirectUrl
// Actions.preSubmitAction = preSubmitAction
// Actions.searchUrl = indexUrl

import createDecorator from 'final-form-calculate'

// import { createSelector } from 'reselect'
// import { formValueSelector } from 'redux-form'
// import {	initCity} from '../redux/Cities'

// const FormValues = state => formValueSelector('customer')(state, 'city.pindex')

// const calc = pindex => ({
//     pindex
// })

// export const CustomerSelector = createSelector(
//     FormValues,
//     calc
// )

export const calculator = createDecorator(
  {
    field: 'city',
    updates: {
      pindex: ({pindex}) => pindex
    }
  }
)
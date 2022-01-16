import createDecorator from 'final-form-calculate'
import { PriceCoeffs } from './Consts'

const density_for_count = (weight_for_count, length_for_count, width) =>
	(weight_for_count && length_for_count && width) ?
	parseInt(weight_for_count / length_for_count / width * 100) : null

const meters_in_roll = (weight, density, width) =>
	(weight && density && width) ? (weight * 100000 / density / width).toFixed(2) : null

const price_rub_m = (dollar_price = 0, dollar_rate = 0, density = 0, width = 0) =>
	dollar_price * dollar_rate * density * width / 100000

const prices = (dollar_price = 0, dollar_rate = 0, density = 0, width = 0) =>
	PriceCoeffs.reduce((result, coeff) =>
		result += coeff + ': ' +
			parseInt(price_rub_m(dollar_price, dollar_rate, density, width) * coeff) + ' / '
	, '')

export const calculator = createDecorator(
  {
    field: 'weight_for_count',
    updates: {
      density_for_count: (weight_for_count, {length_for_count, width}) =>
      	density_for_count(weight_for_count, length_for_count, width)
    }
  },
  {
    field: 'length_for_count',
    updates: {
      density_for_count: (length_for_count, {weight_for_count, width}) =>
      	density_for_count(weight_for_count, length_for_count, width)
    }
  },
  {
    field: 'width',
    updates: {
      density_for_count: (width, {weight_for_count, length_for_count}) =>
      	density_for_count(weight_for_count, length_for_count, width),
      meters_in_roll: (width, {weight, density}) =>
      	meters_in_roll(weight, density, width),
      prices: (width, {dollar_price, dollar_rate, density}) =>
      	prices(dollar_price, dollar_rate, density, width)
    }
  },
  {
    field: 'weight',
    updates: {
      meters_in_roll: (weight, {density, width}) =>
      	meters_in_roll(weight, density, width)
    }
  },
  {
    field: 'density',
    updates: {
      meters_in_roll: (density, {weight, width}) =>
      	meters_in_roll(weight, density, width),
      prices: (density, {dollar_price, dollar_rate, width}) =>
      	prices(dollar_price, dollar_rate, density, width)
    }
  },
  {
    field: 'dollar_price',
    updates: {
      prices: (dollar_price, {dollar_rate, density, width}) =>
      	prices(dollar_price, dollar_rate, density, width)
    }
  },
  {
    field: 'dollar_rate',
    updates: {
      prices: (dollar_rate, {dollar_price, density, width}) =>
      	prices(dollar_price, dollar_rate, density, width)
    }
  }


  // {
  //   field: 'minimum', // when minimum changes...
  //   updates: {
  //     // ...update maximum to the result of this function
  //     maximum: (minimumValue, allValues) =>
  //       Math.max(minimumValue || 0, allValues.maximum || 0)
  //   }
  // },
  // {
  //   field: 'maximum', // when maximum changes...
  //   updates: {
  //     // update minimum to the result of this function
  //     minimum: (maximumValue, allValues) =>
  //       Math.min(maximumValue || 0, allValues.minimum || 0)
  //   }
  // },
  // {
  //   field: /day\[\d\]/, // when a field matching this pattern changes...
  //   updates: {
  //     // ...update the total to the result of this function
  //     total: (ignoredValue, allValues) =>
  //       (allValues.day || [])
  //         .reduce((sum, value) => sum + Number(value || 0), 0)
  //   }
  // }
)

// import { createSelector } from 'reselect'
// import { formValueSelector } from 'redux-form'

// const FormValues = state => formValueSelector('product')(state, 'density', 'width',
// 	'weight_for_count', 'length_for_count', 'weight', 'dollar_price', 'dollar_rate')

// const calc = ({
// 	density,
// 	width,
// 	weight_for_count,
// 	length_for_count,
// 	weight,
// 	dollar_price,
// 	dollar_rate
// }) => {
// 	return {
// 		density_for_count: density_for_count(weight_for_count, length_for_count, width),
// 		meters_in_roll: meters_in_roll(weight, density, width),
// 		prices: prices(dollar_price, dollar_rate, density, width)
// 	}
// }

// export const ProductSelector = createSelector(
// 	FormValues,
// 	calc
// )
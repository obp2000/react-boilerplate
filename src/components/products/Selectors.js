import {
	createSelector
} from 'reselect'
import {
	formValueSelector
} from 'redux-form'
import {
	PriceCoeffs
} from './Consts'

const density_for_count = (weight_for_count, length_for_count, width) =>
	(weight_for_count && length_for_count && width) ?
	weight_for_count / length_for_count / width * 100 : null

const meters_in_roll = (weight, density, width) =>
	(weight && density && width) ? weight * 100000 / density / width : null

const price_rub_m = (dollar_price = 0, dollar_rate = 0, density = 0, width = 0) =>
	dollar_price * dollar_rate * density * width / 100000

const prices = (dollar_price = 0, dollar_rate = 0, density = 0, width = 0) => PriceCoeffs.map((coeff, index) => {
	return {
		coeff,
		price_rub_m: price_rub_m(dollar_price, dollar_rate, density, width) * coeff
	}
})

const FormValues = state => formValueSelector('product')(state, 'density', 'width',
	'weight_for_count', 'length_for_count', 'weight', 'dollar_price', 'dollar_rate')

const calc = ({
	density,
	width,
	weight_for_count,
	length_for_count,
	weight,
	dollar_price,
	dollar_rate
}) => {
	// console.log('prices: ', prices1)
	return {
		density_for_count: density_for_count(weight_for_count, length_for_count, width),
		meters_in_roll: meters_in_roll(weight, density, width),
		prices: prices(dollar_price, dollar_rate, density, width)
	}
}

export const ProductSelector = createSelector(
	FormValues,
	calc
)
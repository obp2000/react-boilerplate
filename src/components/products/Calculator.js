import createDecorator from 'final-form-calculate'

const emptyObject = {}

const emptyArray = []

const canCountDensityForCount = ({
  weight_for_count: weightForCount,
  length_for_count: lengthForCount,
  width,
} = emptyObject) => lengthForCount && width

const countDensityForCount = ({
  weight_for_count: weightForCount = 0,
  length_for_count: lengthForCount,
  width,
} = emptyObject) => weightForCount / lengthForCount / width * 100

export const densityForCount = (_, values) => canCountDensityForCount(values)
  ? parseInt(countDensityForCount(values))
  : null

const canCountMetersInRoll = ({
  weight,
  density,
  width,
} = emptyObject) => density && width

const countMetersInRoll = ({
  weight = 0,
  density,
  width,
} = emptyObject) => weight * 100000 / density / width

export const metersInRoll = (_, values) => canCountMetersInRoll(values)
  ? countMetersInRoll(values).toFixed(2)
  : null

const countPriceRubM = ({
  dollar_price: dollarPrice = 0,
  dollar_rate: dollarRate = 0,
  density = 0,
  width = 0,
} = emptyObject) => dollarPrice * dollarRate * density * width / 100000

const priceRubM = (values, coeff = 1) =>
  parseInt(countPriceRubM(values) * coeff)

const coeffWithPrice = (values, coeff = 1) =>
  `${coeff}: ${priceRubM(values, coeff)}`

export const prices = (_, {
  PriceCoeffs = emptyArray,
  ...values
} = emptyObject) => PriceCoeffs.reduce((result, coeff) => {
    result.push(coeffWithPrice(values, coeff))
    return result
  }, []).join(' / ')

export const calculator = createDecorator({
  field: 'weight_for_count',
  updates: {density_for_count: densityForCount},
}, {
  field: 'length_for_count',
  updates: {density_for_count: densityForCount},
}, {
  field: 'width',
  updates: {
    density_for_count: densityForCount,
    meters_in_roll: metersInRoll,
    prices,
  },
}, {
  field: 'weight',
  updates: {meters_in_roll: metersInRoll,},
}, {
  field: 'density',
  updates: {
    meters_in_roll: metersInRoll,
    prices,
  },
}, {
  field: 'dollar_price',
  updates: {prices},
}, {
  field: 'dollar_rate',
  updates: {prices},
})

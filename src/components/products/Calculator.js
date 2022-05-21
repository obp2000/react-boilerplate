import createDecorator from 'final-form-calculate'

const densityForCount = ({
  weight_for_count: weightForCount,
  length_for_count: lengthForCount,
  width,
}) => (weightForCount && lengthForCount && width) ?
  parseInt(weightForCount / lengthForCount / width * 100) : null

const metersInRoll = ({
  weight,
  density,
  width,
}) => (weight && density && width) ?
  (weight * 100000 / density / width).toFixed(2) : null

const priceRubM = ({
  dollar_price: dollarPrice = 0,
  dollar_rate: dollarRate = 0,
  density = 0,
  width = 0,
}) => dollarPrice * dollarRate * density * width / 100000

const prices = ({
  PriceCoeffs = [],
  ...rest
}) => PriceCoeffs.reduce((result, coeff) =>
  result += `${coeff}: ${parseInt(priceRubM(rest) * coeff)} / `, '')

export const calculator = createDecorator({
  field: 'weight_for_count',
  updates: {
    density_for_count: (_, values) => densityForCount(values),
  },
}, {
  field: 'length_for_count',
  updates: {
    density_for_count: (_, values) => densityForCount(values),
  },
}, {
  field: 'width',
  updates: {
    density_for_count: (_, values) => densityForCount(values),
    meters_in_roll: (width, values) => metersInRoll(values),
    prices: (_, values) => prices(values),
  },
}, {
  field: 'weight',
  updates: {
    meters_in_roll: (_, values) => metersInRoll(values),
  },
}, {
  field: 'density',
  updates: {
    meters_in_roll: (_, values) => metersInRoll(values),
    prices: (_, values) => prices(values),
  },
}, {
  field: 'dollar_price',
  updates: {
    prices: (_, values) => prices(values),
  },
}, {
  field: 'dollar_rate',
  updates: {
    prices: (_, values) => prices(values),
  },
})

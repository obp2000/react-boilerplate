import createDecorator from 'final-form-calculate'

const emptyObject = {}

const emptyArray = []

const canCountDensityForCount = ({
  length_for_count: lengthForCount,
  width,
} = emptyObject) => lengthForCount && width

const countDensityForCount = ({
  weight_for_count: weightForCount = 0,
  length_for_count: lengthForCount,
  width,
} = emptyObject) => weightForCount / lengthForCount / width * 100

export const densityForCount = (_, values) => canCountDensityForCount(values) ?
    parseInt(countDensityForCount(values)) :
    null

const canCountMetersInRoll = ({
  density,
  width,
} = emptyObject) => density && width

const countMetersInRoll = ({
  weight = 0,
  density,
  width,
} = emptyObject) => weight * 100000 / density / width

export const metersInRoll = (_, values) => canCountMetersInRoll(values) ?
    countMetersInRoll(values).toFixed(2) :
    null

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

export const calculator = ({Consts: productConsts} = emptyObject) => {
  // console.log('Consts ', Consts)
  // const prices = (_, values) => countPrices(_, {...values, ...productConsts})

  const updatePrices = {
    prices: (_, values) => prices(_, {...values, ...productConsts}),
  }

  const updateDensityForCount = {
    density_for_count: densityForCount,
  }

  const updateMetersInRoll = {
    meters_in_roll: metersInRoll,
  }

  return createDecorator({
    field: 'weight_for_count',
    updates: updateDensityForCount,
  }, {
    field: 'length_for_count',
    updates: updateDensityForCount,
  }, {
    field: 'width',
    updates: {
      ...updateDensityForCount,
      ...updateMetersInRoll,
      ...updatePrices,
    },
  }, {
    field: 'weight',
    updates: updateMetersInRoll,
  }, {
    field: 'density',
    updates: {
      ...updateMetersInRoll,
      ...updatePrices,
    },
  }, {
    field: 'dollar_price',
    updates: updatePrices,
  }, {
    field: 'dollar_rate',
    updates: updatePrices,
  })
}

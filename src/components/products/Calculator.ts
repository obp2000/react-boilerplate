import createDecorator from 'final-form-calculate'
import type {Calculation} from 'final-form-calculate'
import type {Decorator} from 'final-form'
import {ProductFormValues} from '../../../interfaces'

const canCountDensityForCount = (values: ProductFormValues): boolean =>
  !!values?.length_for_count && !!values?.width

const countDensityForCount = (values: ProductFormValues): number => {
  return  Number(values?.weight_for_count) /
          Number(values?.length_for_count) /
          Number(values?.width) * 100
}

export const densityForCount = (_: null, values: any): string =>
  (canCountDensityForCount(values) ? countDensityForCount(values) : 0).toFixed(0)

const canCountMetersInRoll = (values: ProductFormValues): boolean =>
  !!values?.density && !!values?.width

const countMetersInRoll = (values: ProductFormValues): number =>
  Number(values?.weight) * 100000 / Number(values?.density) /
  Number(values?.width)

export const metersInRoll = (_: null, values: any): string =>
  (canCountMetersInRoll(values) ? countMetersInRoll(values) : 0).toFixed(2)

const canCountPrices = (values: ProductFormValues): boolean =>
!!values?.dollar_price && !!values?.dollar_rate &&
!!values?.density && !!values?.width

const countPriceRubM = (values: ProductFormValues): number =>
  Number(values?.dollar_price) * Number(values?.dollar_rate) *
  Number(values?.density) * Number(values?.width) / 100000

const priceRubM = (values: ProductFormValues, coeff: number = 1): string =>
  (countPriceRubM(values) * coeff).toFixed(0)

const coeffWithPrice = (values: ProductFormValues, coeff: number = 1): string =>
  `${coeff}: ${priceRubM(values, coeff)}`

export const prices = (_: null, values: any): string =>
  canCountPrices(values)
  ? values?.consts?.PriceCoeffs.reduce((
    result: string[],
    coeff: number): string[] => {
      result.push(coeffWithPrice(values, coeff))
      return result
    }, []).join(' / ')
  : ''

export const calculator = (options): Decorator => {
  // console.log('Consts ', Consts)
  // const prices = (_, values) => countPrices(_, {...values, ...productConsts})

  const updatePrices = {
    prices: (_: null, values: any) => prices(null, values)
  }

  const updateDensityForCount = {
    density_for_count: densityForCount,
  }

  const updateMetersInRoll = {
    meters_in_roll: metersInRoll,
  }

  const onChangeWeightForCount = {
    field: 'weight_for_count',
    updates: updateDensityForCount,
  }

  const onChangeLengthForCount = {
    field: 'length_for_count',
    updates: updateDensityForCount,
  }

  const onChangeWidth = {
    field: 'width',
    updates: {
      ...updateDensityForCount,
      ...updateMetersInRoll,
      ...updatePrices,
    }
  }

  const onChangeWeight = {
    field: 'weight',
    updates: updateMetersInRoll,
  }

  const onChangeDensity = {
    field: 'density',
    updates: {
      ...updateMetersInRoll,
      ...updatePrices,
    },
  }

  const onChangeDollarPrice = {
    field: 'dollar_price',
    updates: updatePrices,
  }

  const onChangeDollarRate = {
    field: 'dollar_rate',
    updates: updatePrices,
  }

  const calculations: Calculation[] = [
    onChangeWeightForCount,
    onChangeLengthForCount,
    onChangeWidth,
    onChangeWeight,
    onChangeDensity,
    onChangeDollarPrice,
    onChangeDollarRate
  ]

  return createDecorator(...calculations)
}

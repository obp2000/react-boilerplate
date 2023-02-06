'use client'

import { Prisma } from '@prisma/client'
import type { Calculation } from 'final-form-calculate'
import createDecorator from 'final-form-calculate'
import priceCoeffs from './priceCoeffs.json'

export type Values = (Prisma.ProductCreateArgs['data'] |
  Prisma.ProductUpdateArgs['data']) & {
    density_for_count?: string
    meters_in_roll?: string
    prices?: string
  }

const canCountDensityForCount = (values?: Values): boolean =>
  !!values?.length_for_count && !!values?.width

const countDensityForCount = (values?: Values): number => {
  return Number(values?.weight_for_count) /
    Number(values?.length_for_count) /
    Number(values?.width) * 100
}

export const densityForCount = (_: null, values?: Values): string =>
  (canCountDensityForCount(values)
    ? countDensityForCount(values)
    : 0).toFixed(0)

const canCountMetersInRoll = (values?: Values): boolean =>
  !!values?.weight && !!values?.density && !!values?.width

const countMetersInRoll = (values?: Values): number =>
  Number(values?.weight) * 100000 / Number(values?.density) /
  Number(values?.width)

export const metersInRoll = (_: null, values?: Values): string =>
  (canCountMetersInRoll(values) ? countMetersInRoll(values) : 0).toFixed(2)

const canCountPrices = (values?: Values): boolean =>
  !!values?.dollar_price && !!values?.dollar_rate &&
  !!values?.density && !!values?.width

const countPriceRubM = (values?: Values): number =>
  Number(values?.dollar_price) * Number(values?.dollar_rate) *
  Number(values?.density) * Number(values?.width) / 100000

const priceRubM = (values?: Values, coeff: number = 1): string =>
  (countPriceRubM(values) * coeff).toFixed(0)

const coeffWithPrice = (values?: Values, coeff: number = 1): string =>
  `${coeff}: ${priceRubM(values, coeff)}`

export const prices = (_: null, values?: Values): string =>
  canCountPrices(values)
    // ? values?.consts?.PriceCoeffs.reduce((
    ? priceCoeffs.reduce((
      result: string[],
      coeff: number): string[] => {
      result.push(coeffWithPrice(values, coeff))
      return result
    }, []).join(' / ')
    : ''

const updatePrices = {
  prices: (_: null, values?: Values) => prices(null, values)
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

export const calculations: Calculation[] = [
  onChangeWeightForCount,
  onChangeLengthForCount,
  onChangeWidth,
  onChangeWeight,
  onChangeDensity,
  onChangeDollarPrice,
  onChangeDollarRate
]

export const calculator = createDecorator(...calculations)

export const decorators = [calculator]

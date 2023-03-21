import priceCoeffs from './priceCoeffs.json'
import type { Values } from '@/interfaces/products'

export function densityForCount({ weightForCount, lengthForCount, width }: Values) {
  return weightForCount && lengthForCount && width
    ? Number(weightForCount) / Number(lengthForCount) / Number(width) * 100
    : 0
}

export function metersInRoll({ weight, density, width }: Values) {
  return weight && density && width
    ? Number(weight) * 100000 / Number(density) / Number(width)
    : 0
}

function canCountPrices({ density, width, dollarPrice, dollarRate }: Values) {
  return dollarPrice && dollarRate && density && width
}

function countPriceRubM({ density, width, dollarPrice, dollarRate }: Values) {
  return Number(dollarPrice) * Number(dollarRate) * Number(density) *
    Number(width) / 100000
}

export function prices(values: Values): string {
  return canCountPrices(values)
    ? priceCoeffs.reduce((
      result: string[],
      coeff: number): string[] => {
      result.push(`${coeff}: ${(countPriceRubM(values) * coeff).toFixed(0)}`)
      return result
    }, []).join(' / ')
    : ''
}

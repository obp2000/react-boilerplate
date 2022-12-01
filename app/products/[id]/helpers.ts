import { ProductWithOptions } from "@/interfaces/products"
import { densityForCount, metersInRoll, prices } from './calculator'

export const getInitialValues = ({ object, options}: ProductWithOptions) => {
  let { image: imageOrig, ...objectMod } = object ?? {}
  let objectValues = {
    imageOrig,
    ...objectMod,
    consts: options?.Consts,
  }
  objectValues = {
    ...objectValues,
    density_for_count: densityForCount(null, objectValues),
    meters_in_roll: metersInRoll(null, objectValues),
    prices: prices(null, objectValues),
  }
  return objectValues
}

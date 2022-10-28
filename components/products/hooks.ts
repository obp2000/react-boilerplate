import { useContext } from 'react'
import type {
  Product, ProductFormValues, ProductOptionsType,
  ProductType
} from '../../interfaces/products'
import { OptionsContext } from '../layout/Layout'
import { url as indexUrl } from './apiSlice'
import {
  densityForCount,
  metersInRoll,
  prices
} from './calculator'
import ProductName from './ProductName'

const dropdownListTextField = ({
  get_product_type_display: getProductTypeDisplay,
  get_threads_display: getThreadsDisplay,
  get_contents_display: getContentsDisplay,
  name,
}: Product) => [
    getProductTypeDisplay,
    getThreadsDisplay,
    getContentsDisplay,
    name]

export const useDropdown = () => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: indexUrl,
  renderValueComponent: ProductName,
})

export const useFormInitialValues = ({
  object
}: ProductType): ProductFormValues => {
  const { options } = useContext(OptionsContext) as ProductOptionsType
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

import { indexUrl } from './config'
import ProductName from './ProductName'
import type { Product } from '../../../interfaces/products'

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

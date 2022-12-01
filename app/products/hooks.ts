import type { Product } from '@/interfaces/products'
import { indexUrl } from './[id]/config'
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

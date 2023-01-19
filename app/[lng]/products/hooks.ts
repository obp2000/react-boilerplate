import { ProductsSelect } from '@/interfaces/api'
import ProductName from './ProductName'
import options from '@/app/[lng]/products/[id]/options.json'
import { getDisplayName } from './ProductName'

function dropdownListTextField({
  productType,
  threads,
  contents,
  fleece,
  name
}: ProductsSelect) {
  let res = [name]
  if (productType) {
    res.push(productType.name)
  }
  if (threads !== null) {
    res.push(getDisplayName(options.threads.choices, threads))
  }
  if (contents !== null) {
    res.push(getDisplayName(options.contents.choices, contents))
  }
  if (fleece) {
    res.push(options.fleece.label)
  }
  return res
}

export const useDropdown = () => ({
  textField: dropdownListTextField,
  dataKey: 'id',
  searchPath: '/products/',
  renderValueComponent: ProductName,
})


// const dropdownListTextField1 = ({
//   get_product_type_display: getProductTypeDisplay,
//   get_threads_display: getThreadsDisplay,
//   get_contents_display: getContentsDisplay,
//   // productType: {
//   //   name: productTypeName
//   // },
//   name,
// }: ProductsSelect) => [
//     getProductTypeDisplay,
//     getThreadsDisplay,
//     getContentsDisplay,
//     name]

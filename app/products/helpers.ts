import type { Prisma } from "@prisma/client"
import ProductName from './ProductName'
import select from './select.json'

export type Product = Prisma.ProductGetPayload<{ select: typeof select.objects }>

const dropdownListTextField = ({
  productType,
  name
}: Prisma.ProductGetPayload<{ select: typeof select.objects }>) => {
  let res = [name]
  if (productType) {
    res.push(productType.name)
  }
  return res
}

export function useDropdown() {
  return {
    textField: dropdownListTextField,
    dataKey: 'id',
    searchPath: '/products/',
    renderValueComponent: ProductName,
  }
}

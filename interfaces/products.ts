import tables from '@/app/_tables/tables.json'
import type { Translation } from "@/app/i18n/dictionaries"
import { Prisma } from "@prisma/client"
import type {
    UseControllerProps,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form"
import type { SerializedOrderObject } from "./orders"
import type { ProductTypeType } from "./productTypes"

// export type Values = Prisma.ProductUncheckedCreateWithoutOrderItemsInput |
//   Prisma.ProductUncheckedUpdateWithoutOrderItemsInput

export type Product = Prisma.ProductGetPayload<{
  select: typeof tables.products.select.objects
}>

export type ProductObject = Prisma.ProductGetPayload<{
  select: typeof tables.products.select.object
}>

export type SerializedProduct = Omit<Product, 'createdAt' | 'updatedAt'> &
{
  createdAt: string
  updatedAt: string
}

export type SerializedProductObject = Omit<ProductObject, 'createdAt'> &
{
  createdAt?: string
}

export type ProductFormProps = {
  mutateArgs: {
    lng: string
    table: string
    id?: number
    message: string
  }
  initialValues: SerializedProductObject
  productTypes: ProductTypeType[]
  save: string
  errorMessages: Translation['errorMessages']
  units: Translation['units']
  labels: Translation['product']
}

export type ProductRowType = (arg0: Product) => (string | JSX.Element)[]

export type ProductLabels = (dict: Translation) => { labels: Translation['product'] }

export type ProductAutocompleteProps = {
  searchPath: string
  label?: string
  init?: Product | null
  getOptionLabel: (arg0: Product) => string
  busy: boolean
  errorMessages: Translation['errorMessages']
  notFound: string
  onChangeAction?: (arg0: Product) => void
  className?: string
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
} & UseControllerProps<SerializedOrderObject, `orderItems.${number}.product`>

export type ProductPageProps = {
  params: { lng: string, id: string }
  table: string
  labels: ProductLabels
  getOptions: () => Promise<Pick<ProductFormProps, 'productTypes'>>
  form: (props: ProductFormProps) => JSX.Element
  handleSubmit?: (formData: FormData) => Promise<void>
}

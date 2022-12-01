import 'server-only'

import { Customer, CustomerType } from "@/interfaces/customers"

export const getInitialValues = ({ object }: CustomerType): Customer | {} => {
  let objectValues = object ?? {}
  return objectValues
}

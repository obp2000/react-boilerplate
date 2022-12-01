import { Order, OrderOptionsType } from "@/interfaces/orders"
import { MainContext } from "@/services/context"
import { useContext } from "react"
import { getInitialValues } from './config'

export const useInitialValues = (object: Order | undefined) => {
  const { options } = useContext(MainContext) as OrderOptionsType
  return getInitialValues({object, options})
}

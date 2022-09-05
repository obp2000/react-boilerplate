// import {useObjects} from '../../services/entityAdapter'
// import {useOptionsOuery} from '../options/hooks'
// import TableRow from '../customers/tableRow'
// import TableLabels from '../customers/tableLabels'
// import {
//   useDeleteCustomerMutation,
// } from '../customers/apiSlice'
// import type {CustomersTableConfig} from '../customers/hooks'
// import type {ProductsTableConfig} from '../products/hooks'
// import type {OrdersTableConfig} from '../orders/hooks'
// import {
//   Customer,
//   Product,
//   Order,
//   CustomerOptions,
//   ProductOptions,
//   OrderOptions,
//   CommonConsts,
// } from '../../../interfaces'

// export type TableConfig = CustomersTableConfig | ProductsTableConfig |
//   OrdersTableConfig

// export type CustomersTable = {
//   indexUrl: string
//   allObjects: Customer[]
//   totalCount?: number
//   totalPages?: number
//   busyLoadingObjects: boolean
//   TableRow: typeof TableRow
//   TableLabels: typeof TableLabels
//   useDeleteObjectMutation: typeof useDeleteCustomerMutation
//   commonConsts: CommonConsts
//   options: CustomerOptions
// }

// export const useObjectsTable = ({
//   indexUrl,
//   getObjects,
//   TableRow,
//   TableLabels,
//   useDeleteObjectMutation,
// }: TableConfig): CustomersTable => {
//   // const {isFallback} = useRouter()
//   const {commonConsts, options} = useOptionsOuery(indexUrl)
//   const {
//     busyLoadingObjects,
//     allObjects,
//     totalCount = 0,
//     totalPages = 0,
//   } = useObjects(getObjects)
//   return {
//     indexUrl,
//     allObjects,
//     totalCount,
//     totalPages,
//     busyLoadingObjects,
//     TableRow,
//     TableLabels,
//     useDeleteObjectMutation,
//     commonConsts,
//     options,
//   }
// }

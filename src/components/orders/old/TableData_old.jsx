import {ShortName} from '../customers/CustomerName'

const TableData = {
  table: 'orders',
  fields: {
    id: ({id}) => id,
    customer: ({customer}, {
      options: {
        customer: {
          children: customer_props,
        },
      },
    }) => ShortName(customer, customer_props),
    order_items_cost: ({order_items_cost}) => order_items_cost,
    created_at: ({created_at}) => created_at,
    updated_at: ({updated_at}) => updated_at,
  },
}

export default TableData

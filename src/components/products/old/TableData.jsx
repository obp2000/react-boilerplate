import ProductName from './ProductName'

const TableData = {
  table: 'products',
  fields: {
    id: ({id}) => id,
    name: (object, {options}) => ProductName(object, options),
    price: ({price}) => price,
    width: ({width}) => width,
    density: ({density}) => density,
    created_at: ({created_at}) => created_at,
    updated_at: ({updated_at}) => updated_at,
  },
}

export default TableData

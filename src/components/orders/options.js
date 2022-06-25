export const orderCustomerOptions = ({
  customer: {
    children
  } = {}
} = {}) => children

export const orderOrderItemOptions = ({
  order_items: {
    child: {
      children
    } = {}
  } = {}
} = {}) => children

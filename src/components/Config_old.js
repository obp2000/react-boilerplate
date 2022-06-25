import customersConfig from './customers/config'
import productsConfig from './products/config'
import ordersConfig from './orders/config'

const config = Object.freeze({
  BaseTable: 'customers',
  customers: customersConfig,
  products: productsConfig,
  orders: ordersConfig,
  user: customersConfig,
})

export default config

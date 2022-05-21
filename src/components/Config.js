import customersConfig from './redux/Customers'
import productsConfig from './redux/Products'
import ordersConfig from './redux/Orders'

const config = Object.freeze({
  BaseTable: 'customers',
  customers: customersConfig,
  products: productsConfig,
  orders: ordersConfig,
  user: customersConfig,
})

export default config

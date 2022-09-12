// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

// export type User = {
//   id: number
//   name: string
// }

export type FieldProps = {
  type?: string
  required?: boolean
  read_only?: boolean
  label?: string
  min_value?: number
  max_value?: number
  help_text?: string
}

export type FieldLabel = {
  label?: string
}

export type City = {
  id: number
  pindex: string
  city: string
}

export type CityOptions = {
  id: FieldProps
  pindex: FieldProps
  city: FieldProps
}

export type Customer = {
  id: number
  nick: string
  name?: string
  city?: City
  address?: string
  created_at: string
  updated_at: string
}

export type CustomerFormValues = {
  id?: number
  nick?: string
  name?: string
  city?: City
  city_id?: number
  address?: string
}

export type CustomerCityOptions = {
  type: 'nested object'
  required: boolean
  read_only: boolean
  label: string
  children: CityOptions
}

export type CustomerOptions = {
  id: FieldProps
  nick: FieldProps
  name: FieldProps
  city: CustomerCityOptions
  address: FieldProps
  created_at: FieldProps
  updated_at: FieldProps
  name_singular: string
  name_plural: string
}

export type Product = {
  id: number
  name: string
  product_type?: number
  get_product_type_display?: string
  threads?: number
  get_threads_display?: string
  contents?: number
  get_contents_display?: string
  fleece?: boolean
  price: number
  weight?: number
  width?: number
  density?: number
  dollar_price?: number
  dollar_rate?: number
  width_shop?: number
  density_shop?: number
  weight_for_count?: number
  length_for_count?: number
  price_pre?: number
  image?: string
  created_at: string
  updated_at: string
}

export type ProductConsts = {
  PriceCoeffs: number[]
}

export type ProductFormValues = {
  id?: number
  name?: string
  product_type?: number
  product_type_id?: number
  threads?: number
  contents?: number
  fleece?: boolean
  price?: number
  weight?: number
  width?: number
  density?: number
  dollar_price?: number
  dollar_rate?: number
  width_shop?: number
  density_shop?: number
  weight_for_count?: number
  length_for_count?: number
  price_pre?: number
  image?: string
  new_image?: string
  density_for_count?: number | string
  meters_in_roll?: number | string
  prices?: string
  toFormData?: boolean
  consts?: ProductConsts
}

export type ProductTypeChoice = {
  id: number
  name: string
}

export type ThreadsChoice = {
  value?: number
  display_name: string
}

export type ContentsChoice = {
  value?: number
  display_name: string
}

export type ProductOptions = {
  id: FieldProps
  name: FieldProps
  product_type: {
    label: string
    choices: ProductTypeChoice[]
  }
  get_product_type_display: FieldProps
  threads: {
    type: 'choice'
    required: boolean
    read_only: boolean
    label: string
    choices: ThreadsChoice[]
  }
  get_threads_display: FieldProps
  contents: {
    type: 'choice'
    required: boolean
    read_only: boolean
    label: string
    choices: ContentsChoice[]
  }
  get_contents_display: FieldProps
  fleece: FieldProps
  price: FieldProps
  weight: FieldProps
  width: FieldProps
  density: FieldProps
  dollar_price: FieldProps
  dollar_rate: FieldProps
  width_shop: FieldProps
  density_shop: FieldProps
  weight_for_count: FieldProps
  length_for_count: FieldProps
  price_pre: FieldProps
  image: FieldProps
  created_at: FieldProps
  updated_at: FieldProps
  name_singular: string
  name_plural: string
  new_image: FieldLabel
  prices: FieldLabel
  density_for_count: FieldLabel
  meters_in_roll: FieldLabel
  Consts: ProductConsts
}

export type OrderItem = {
  id?: number
  order?: number
  product?: Product
  amount?: number
  price?: number
  cost?: number | string
  weight?: number | string
}

export type OrderItemFormValues = {
  id?: number
  order?: number
  product?: Product
  product_id?: number
  amount?: number
  price?: number
  cost?: number | string
  weight?: number | string
  _destroy?: boolean
}

export type OrderItemOptions = {
  id: FieldProps
  order: FieldProps
  product: {
    type: 'nested object'
    required: boolean
    read_only: boolean
    label: string
    children: ProductOptions
  }
  amount: FieldProps
  price: FieldProps
  cost: FieldProps
  weight: FieldProps
}

export type Order = {
  id: number
  customer: Customer
  post_cost?: number | string
  packet?: number
  delivery_type?: number
  address?: string
  gift?: string
  order_items?: OrderItem[]
  order_items_amount?: number | string
  order_items_cost?: number | string
  order_items_weight?: number
  created_at: string
  updated_at: string
  // consts?: OrderConsts
}

export type OrderConsts = {
  SUM_FOR_POST_DISCOUNT: number
  POST_DISCOUNT_PERCENT: number
  SUM_FOR_GIFT: number
  GIFT_WEIGHT: number
  PACKET_WEIGHT: number
  SAMPLES_WEIGHT: number
}

export type OrderFormValues = {
  id?: number
  customer?: Customer
  customer_id?: number
  post_cost?: number | string
  packet?: number
  delivery_type?: number
  address?: string
  gift?: string
  order_items?: OrderItemFormValues[]
  order_items_amount?: number | string
  order_items_cost?: number | string
  order_items_weight?: number
  samples_weight?: number
  packet_weight?: number
  gift_weight?: number
  post_cost_with_packet?: number | string
  post_discount?: number | string
  total_postals?: number | string
  total_sum?: number | string
  total_weight?: number
  consts?: OrderConsts
}

export type PacketChoice = {
  value?: number
  display_name: string
}

export type DeliveryTypeChoice = {
  value?: number
  display_name: string
}

export type OrderOptions = {
  id: FieldProps
  customer: {
        type: 'nested object'
        required: boolean
        read_only: boolean
        label: string
        children: CustomerOptions
  }
  post_cost: FieldProps
  packet: {
    type: 'choice'
    required: boolean
    read_only: boolean
    label: string
    choices: PacketChoice[]
  }
  delivery_type: {
    type: 'choice'
    required: boolean
    read_only: boolean
    label: string
    choices: DeliveryTypeChoice[]
  }
  address: FieldProps
  gift: FieldProps
  order_items: {
    type: 'field'
    required: boolean
    read_only: boolean
    label: string
    child: {
      type: 'nested object'
      required: boolean
      read_only: boolean
      children: OrderItemOptions
    }
  }
  order_items_amount: FieldProps
  order_items_cost: FieldLabel
  order_items_weight: FieldProps
  created_at: FieldProps
  updated_at: FieldProps
  name_singular: string
  name_plural: string
  post_cost_with_packet: FieldLabel
  post_discount: FieldLabel
  total_postals: FieldLabel
  total_sum: FieldLabel
  need_gift: FieldLabel
  samples: FieldLabel
  Consts: OrderConsts
}

export type User = {
  pk?: number
  username?: string
  email?: string
  first_name?: string
  last_name?: string
}

export type UserOptions = {
  pk: FieldProps
  username: FieldProps
  email: FieldProps
  first_name: FieldProps
  last_name: FieldProps
  name_singular: string
}

export type MainMenuItem = {
  path: string
  label: string
}

export type ErrorMessages = {
  invalid_choice?: string
  null?: string
  blank: string
  unique?: string
  unique_for_date?: string
  password_mismatch: string
  invalid_email: string
  short_password: string
  not_integer?: string
}

export type CommonConsts = {
  'new': string
  edit: string
  'delete': string
  add: string
  save: string
  successfully: string
  yes: string
  no: string
  search: string
  login: string
  register: string
  main_menu: MainMenuItem[]
  auth_menu_item: MainMenuItem
  brand_text: string
  error_messages: ErrorMessages
  from: string
  back: string
  not_found: string
  count: string
}

export type SearchFormValues = {
  term: string
}

export type SearchTerm = {
  term?: string | string[]
}

export type Confirmation = {
  proceedLabel: string
  cancelLabel: string
  title: string
  confirmation: string
  show: boolean
  proceed: Function
  enableEscape: boolean
}

export type anyObject = Customer | Product | Order

export type anyObjectOptions = CustomerOptions | ProductOptions | OrderOptions

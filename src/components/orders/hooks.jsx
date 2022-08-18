import React from 'react'
import createDecorator from 'final-form-submit-listener'
import arrayMutators from 'final-form-arrays'
import {
  getOrders as getObjects,
  useGetOrderQuery as useGetObjectQuery,
  useCreateOrderMutation as useCreateObjectMutation,
  useUpdateOrderMutation as useUpdateObjectMutation,
  useDeleteOrderMutation as useDeleteObjectMutation,
} from './apiSlice'
import ObjectFormRender from './OrderFormRender'
import {validate} from './Validators'
import {useObjectsTable} from '../objectsTable/hooks'
import {useObjectForm} from '../objectForm/hooks'
import {formInitialOrderItems} from '../orderItems/hooks'
import {
  calculator,
  orderItemsAmount,
  orderItemsCost,
  orderItemsWeight,
  postCostWithPacket,
  postDiscount,
  totalPostals,
  totalSum,
  totalWeight,
} from './Calculator'
import {useDropdown as useCustomerDropdownAttrs} from '../customers/hooks'
import ShortName from '../customers/ShortName'
import DropdownListFormGroup from '../dropdownList/DropdownListFormGroup'

const emptyObject = {}

const emptyArray = []

export const indexUrl = '/orders/'

const tableFieldNames = [
  'id',
  'customer',
  'order_items_cost',
  'created_at',
  'updated_at',
]

const useTableFieldValues = ({
  id,
  customer,
  order_items_cost,
  created_at,
  updated_at,
} = emptyObject,
options
) => [
  id,
  <ShortName {...customer}
    options={orderCustomerOptions(options)} key={id} />,
  order_items_cost,
  created_at,
  updated_at,
]

export const useOrdersTable = () => {
  const tableProps = useObjectsTable({indexUrl, getObjects})
  	return {
  		indexUrl,
	    tableFieldNames,
	   	useDeleteObjectMutation,
	    useTableFieldValues,
	    ...tableProps,
  	}
}

export const calculatedFields = [
  'post_cost_with_packet',
  'post_discount',
  'total_postals',
  'total_sum',
  'total_weight',
]

const deleteValues = [
  'customer',
  'samples_weight',
  'packet_weight',
  'gift_weight',
  'order_items_amount',
  'order_items_cost',
  'order_items_weight',
  ...calculatedFields,
]

const deleteOrderItemValues = [
  'product',
  'cost',
  'weight',
  '_destroy',
]

const preSubmitAction = (values) => {
  if (values.customer) {
    values.customer_id = values.customer.id
  }
  (values.order_items ?? emptyArray).map((orderItem, index) => {
    orderItem.product_id = orderItem.product?.id
    deleteOrderItemValues.map((deleteValue) => {
      delete orderItem[deleteValue]
    })
  })
  deleteValues.map((deleteValue) => {
    delete values[deleteValue]
  })
}

const submitListener = createDecorator({
  beforeSubmit: (form) => preSubmitAction(form.getState().values),
})

const formInitialValues = ({
  created_at,
  updated_at,
  ...rest
} = emptyObject,
{Consts: orderConsts} = emptyObject,
) => {
  // const Consts = options?.Consts || {}
  const orderItems = {
    order_items: formInitialOrderItems(rest?.order_items),
  }
  let objectValues = {
    ...rest,
    // ...Consts,
    samples_weight: orderConsts?.SAMPLES_WEIGHT,
    packet_weight: orderConsts?.PACKET_WEIGHT,
    gift_weight: orderConsts?.GIFT_WEIGHT,
    ...orderItems,
    order_items_amount: orderItemsAmount(null, orderItems),
    order_items_cost: orderItemsCost(null, orderItems),
    order_items_weight: orderItemsWeight(null, orderItems),
  }
  objectValues = {
    ...objectValues,
    post_cost_with_packet: postCostWithPacket(null, objectValues),
    post_discount: postDiscount(null, {...objectValues, ...orderConsts}),
    total_postals: totalPostals(null, {...objectValues, ...orderConsts}),
  }
  return {
    ...objectValues,
    total_sum: totalSum(null, {...objectValues, ...orderConsts}),
    total_weight: totalWeight(null, {...objectValues, ...orderConsts}),
  }
}

const postCostCount = (args, state, {getIn, changeValue, resetFieldState}) => {
  const pindex = getIn(state, 'formState.values.customer.city.pindex')
  const totalWeight = getIn(state, 'formState.values.total_weight')
  const postBaseUrl = 'http://api.print-post.com/api/sendprice/v2/'

  const params = new URLSearchParams()
  params.set('from_index', '153038')
  params.set('to_index', pindex)
  params.set('weight', totalWeight)

  fetch(`${postBaseUrl}?${params.toString()}`)
      .then((response) => response.json())
      .then(({posilka_nds: posilkaNds}) => {
        changeValue(state, 'post_cost',
            (oldValue) => (posilkaNds ?? 0).toFixed(2))
        return resetFieldState('post_cost')
      })
      .catch((e) => console.error(e))
}

const formDecorators = (options) => [calculator(options), submitListener]

export const useOrderForm = () => {
  const mutators = {postCostCount, ...arrayMutators}
  const formAttrs = useObjectForm({
    indexUrl,
    useGetObjectQuery,
    formInitialValues,
    formDecorators,
    validate,
    useUpdateObjectMutation,
    useCreateObjectMutation,
  })
  return {
    	mutators,
    calculatedFields,
    	render: ObjectFormRender,
    	...formAttrs,
  }
}

const orderCustomerOptions = ({
  customer: {
    children,
  } = emptyObject,
} = emptyObject) => children

export const orderOrderItemOptions = ({
  order_items: {
    child: {
      children,
    } = emptyObject,
  } = emptyObject,
} = emptyObject) => children

export const useCustomerDropdown = ({options}) => ({
  ...useCustomerDropdownAttrs(orderCustomerOptions(options)),
  component: DropdownListFormGroup,
  options,
})

export const usePostCostButton = ({
  form: {
    mutators: {
      postCostCount,
    },
  },
  values: {
    customer,
    total_weight: totalWeight,
  } = emptyObject,
  commonConsts,
}) => ({
  name: 'post_cost_button',
  onClick: () => postCostCount(),
  disabled: !customer?.city?.pindex || !totalWeight,
  children: commonConsts?.count,
})

export const useOrderItemsTotalText = ({options}) => ({
  orderItemsCostLabel: options?.order_items_cost.label,
  needGiftLabel: options?.need_gift.label,
  gte: options?.Consts?.SUM_FOR_GIFT,
})

export const useGiftIfNeeded = ({options}) => ({
  gte: options?.Consts.SUM_FOR_GIFT,
})

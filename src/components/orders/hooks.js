import React from 'react'
import createDecorator from 'final-form-submit-listener'
import {useOutletContext} from 'react-router-dom'
import arrayMutators from 'final-form-arrays'
import {
    getOrders as getObjects,
    useCreateOrderMutation as useCreateObjectMutation,
    useUpdateOrderMutation as useUpdateObjectMutation,
    useDeleteOrderMutation as useDeleteObjectMutation,
} from './apiSlice'
import {useObjectsData, useObjects} from '../../services/entityAdapter'
import ObjectFormRender from './OrderFormRender'
import {validate} from './Validators'
import {useObjectsTable} from '../objectsTable/hooks'
import {useObjectForm} from '../objectForm/hooks'
import {formInitialOrderItems} from '../orderItems/hooks'
import {
	orderCalculator,
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

const emptyObject = {}

const emptyArray = []

const indexUrl = '/orders/'

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
  updated_at
} = emptyObject) => {
  const options = useOrderCustomerOptions()
    return [
      id,
      <ShortName {...{...customer, options}} />,
      order_items_cost,
      created_at,
      updated_at,
    ]
}

export const useOrdersTable = () => {
	const tableProps = useObjectsTable({indexUrl, getObjects})
  	return {
  		indexUrl,
	    tableFieldNames,
	   	useDeleteObjectMutation,
	    useTableFieldValues,
	    ...tableProps
  	}
}

export const calculatedFields = [
  'need_gift',
  'post_cost_with_packet',
  'post_discount',
  'total_postals',
  'total_sum',
  'total_weight',
]

const deleteValues = [
  'customer',
  'delivery_types',
  'packets',
  'samples_weight',
  'packet_weight',
  'post_cost_with_packet',
  'post_discount',
  'total_postals',
  'total_sum',
  'total_weight',
  'order_items_amount',
  'order_items_cost',
  'order_items_weight',
  'created_at',
  'updated_at',
  'Consts',
  'gift_weight',
  'order_items_cost_label',
  'need_gift_label',
  'need_gift',
]

const deleteOrderItemValues = [
    'cost',
    'weight',
    '_destroy',
    'product',
]

const preSubmitAction = (values) => {
  if (values.customer) {
    values.customer_id = values.customer.id
  }
  (values.order_items ?? emptyArray).map((orderItem, index) => {
    if (orderItem.product) {
      orderItem.product_id = orderItem.product.id
    }
    deleteOrderItemValues.map((deleteValue) => {
      delete orderItem[deleteValue]
    })
  })
  deleteValues.map((deleteValue) => {
    delete values[deleteValue]
  })
}

const submitListener = createDecorator({
  beforeSubmit: (form) => preSubmitAction(form.getState().values)
})

const formInitialValues = (
  object,
  {Consts} = emptyObject,
) => {
    // const Consts = options?.Consts || {}
    const orderItems = {
      order_items: formInitialOrderItems(object?.order_items)
    }
    let objectValues = {
      ...object,
      ...Consts,
      samples_weight: Consts?.SAMPLES_WEIGHT,
      packet_weight: Consts?.PACKET_WEIGHT,
      gift_weight: Consts?.GIFT_WEIGHT,
      ...orderItems,
      order_items_amount: orderItemsAmount(null, orderItems),
      order_items_cost: orderItemsCost(null, orderItems),
      order_items_weight: orderItemsWeight(null, orderItems),
    }
    objectValues = {
      ...objectValues,
      post_cost_with_packet: postCostWithPacket(null, objectValues),
      post_discount: postDiscount(null, objectValues),
      total_postals: totalPostals(null, objectValues),
    }
    return {
      ...objectValues,
      total_sum: totalSum(null, objectValues),
      total_weight: totalWeight(null, objectValues),
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

export const useOrderForm = (object) => {
	const decorators = [orderCalculator, submitListener]
	const mutators = {postCostCount, ...arrayMutators}
	const formAttrs = useObjectForm({
		indexUrl,
		object,
		formInitialValues,
		validate,
		useUpdateObjectMutation,
		useCreateObjectMutation,
	})
    return {
    	decorators,
    	mutators,
    	render: ObjectFormRender,
    	...formAttrs,
    }
}

const orderCustomerOptions = ({
  customer: {
    children
  } = emptyObject
} = emptyObject) => children

export const useOrderCustomerOptions = () => {
  const {options} = useOutletContext()
  return orderCustomerOptions(options)
}

export const orderOrderItemOptions = ({
  order_items: {
    child: {
      children
    } = emptyObject
  } = emptyObject
} = emptyObject) => children

export const useCustomerDropdown = () => {
    const options = useOrderCustomerOptions()
    return useCustomerDropdownAttrs(options)
}

export const usePostCostButton = ({
  form: {
    mutators: {
      postCostCount
    }
  },
  values: {
    customer,
    total_weight: totalWeight
  } = emptyObject
}) => {
  const {
    commonConsts: {
      count
    } = emptyObject
  } = useOutletContext()
  return {
    name: 'post_cost_button',
    onClick: () => postCostCount(),
    disabled: !customer?.city?.pindex || !totalWeight,
    children: count,
  }
}

import {
	createSelector
} from 'reselect'
import {
	formValueSelector
} from 'redux-form'
import {
	order_item_sum
} from '../order_items/Selectors'
import {
	SamplesWeight
} from '../samples/Consts'
import {
	GiftWeight
} from '../gifts/Consts'
import {
	PacketWeight
} from '../post_packets/Consts'
import {
	initCustomer
} from '../redux/Customers'
import {
	initCity
} from '../redux/Cities'

const post_cost_with_packet = (post_cost = 0, packet = 0) => post_cost + packet

const post_discount = (cost = 0, post_cost = 0, packet = 0) => cost >= 1000 ?
	post_cost_with_packet(post_cost, packet) * 0.3 :
	0

const post_cost_with_packet_and_post_discount =
	(cost = 0, post_cost = 0, packet = 0) => post_cost_with_packet(post_cost, packet) -
	post_discount(cost, post_cost, packet)

const cost_with_postal_and_post_discount =
	(cost = 0, post_cost = 0, packet = 0) => cost +
	post_cost_with_packet_and_post_discount(cost, post_cost, packet)

const needGift = cost => cost >= 2000

const tolalWeight = (weight, cost) => weight + PacketWeight + SamplesWeight +
	(needGift(cost) ? GiftWeight : 0)

const hasPostDiscount = (cost = 0, post_cost = 0, packet = 0) =>
	post_discount(cost, post_cost, packet) > 0

const init_order_items_sum = {
	count: 0,
	amount: 0,
	cost: 0,
	weight: 0
}

const order_items_sum = (order_items = []) =>
	order_items.reduce((sum, order_item, index) => {
		const {
			amount,
			cost,
			weight,
			_destroy
		} = order_item_sum(order_item)
		if (_destroy) return sum
		return {
			count: sum.count + 1,
			amount: sum.amount + 1 * amount,
			cost: sum.cost + cost,
			weight: sum.weight + weight
		}
	}, init_order_items_sum)

const OrderSelector = state => formValueSelector('order')(state, 'customer', 'post_cost', 'packet', 'order_items')

const order_sum = ({
	customer = initCustomer,
	post_cost = 0,
	packet = 0,
	order_items = []
}) => {
	const {
		city: city1  = initCity,
		address = ''
	} = customer || initCustomer
	const {
		pindex = '',
		city = ''
	} = city1 || initCity
	const {
		count = 0,
			amount = 0,
			cost = 0,
			weight = 0
	} = order_items_sum(order_items)
	return {
		pindex,
		city,
		address,
		post_cost_with_packet: post_cost_with_packet(post_cost, packet),
		post_discount: post_discount(cost, post_cost, packet),
		post_cost_with_packet_and_post_discount: post_cost_with_packet_and_post_discount(cost, post_cost, packet),
		cost_with_postal_and_post_discount: cost_with_postal_and_post_discount(cost, post_cost, packet),
		needGift: needGift(cost),
		tolalWeight: tolalWeight(weight, cost),
		hasPostDiscount: hasPostDiscount(cost, post_cost, packet),
		count,
		amount,
		cost,
		weight
	}
}

export const OrderSumSelector = createSelector(
	OrderSelector,
	order_sum
)
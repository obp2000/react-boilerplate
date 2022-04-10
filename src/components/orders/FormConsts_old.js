const FormConsts = ({
	Consts = {},
	Consts: {
        SAMPLES_WEIGHT: samples_weight ,
        PACKET_WEIGHT: packet_weight,
        GIFT_WEIGHT: gift_weight,
	} = {},
    order_items_cost: {
    	label: order_items_cost_label
    } = {},
    need_gift: {
    	label: need_gift_label
    } = {}
} = {}) => ({
	Consts,
	samples_weight,
	packet_weight,
	gift_weight,
	order_items_cost_label,
	need_gift_label
})

export default FormConsts

import { createSelector } from 'reselect'
import { selectOptions, selectConsts } from './CommonConsts'

export const selectOrderItemProps =
    createSelector([selectOptions], ({
        order_items: {
            child: {
                children = {}
            } = {}
        } = {},
    }) => children)

export const selectTableLabels =
    createSelector([selectOrderItemProps], ({
        product = {},
        price = {},
        amount = {},
        cost = {},
        weight = {}
    }) => ({
        n_label: '№',
        product_label: product.label,
        price_label: price.label,
        amount_label: amount.label,
        cost_label: cost.label,
        weight_label: weight.label
    }))

export const selectProductProps =
    createSelector([selectOrderItemProps], ({
        product: {
            children = {}
        } = {}
    }) => children)

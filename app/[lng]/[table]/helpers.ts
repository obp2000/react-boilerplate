import 'server-only'

import { Translation } from '@/app/i18n/dictionaries'
import type { Customer } from '@/app/customers/helpers'
import type { Order } from '@/app/orders/helpers'
import type { Product } from '@/app/products/helpers'
import type { PaginatedResult } from 'prisma-pagination'
import type { ParsedUrlQuery } from 'querystring'

const tableLables = {
	customers: () => import('@/app/customers/TableLabels').then((module) => module.default),
	products: () => import('@/app/products/TableLabels').then((module) => module.default),
	orders: () => import('@/app/orders/TableLabels').then((module) => module.default),
}

export async function getTableLabels(table: string) {
	return tableLables[table as keyof typeof tableLables]()
}

type CustomerRowType = ({ object, dict }: { object: Customer, dict: Translation }) => JSX.Element
type ProductRowType = ({ object, dict }: { object: Product, dict: Translation }) => JSX.Element
type OrderRowType = ({ object, dict }: { object: Order, dict: Translation }) => JSX.Element

const tableRow = {
	customers: () => import('@/app/customers/TableRow').then((module) => module.default),
	products: () => import('@/app/products/TableRow').then((module) => module.default),
	orders: () => import('@/app/orders/TableRow').then((module) => module.default),
}

export async function getTableRow(table: string): Promise<CustomerRowType>
export async function getTableRow(table: string): Promise<ProductRowType>
export async function getTableRow(table: string): Promise<OrderRowType>
export async function getTableRow(table: string): Promise<any> {
	return tableRow[table as keyof typeof tableRow]()
}

type getCustomers = ({ perPage, searchParams }: { perPage?: number, searchParams: ParsedUrlQuery }) =>
	Promise<PaginatedResult<Customer>>
type getProducts = ({ perPage, searchParams }: { perPage?: number, searchParams: ParsedUrlQuery }) =>
	Promise<PaginatedResult<Product>>
type getOrders = ({ perPage, searchParams }: { perPage?: number, searchParams: ParsedUrlQuery }) =>
	Promise<PaginatedResult<Order>>

const getObjects = {
	customers: () => import('@/app/customers/serverHelpers').then(({ getObjects }) => getObjects),
	products: () => import('@/app/products/serverHelpers').then(({ getObjects }) => getObjects),
	orders: () => import('@/app/orders/serverHelpers').then(({ getObjects }) => getObjects),
}

export async function getGetObjects(table: string): Promise<getCustomers>
export async function getGetObjects(table: string): Promise<getProducts>
export async function getGetObjects(table: string): Promise<getOrders>
export async function getGetObjects(table: string) {
	return getObjects[table as keyof typeof getObjects]()
}

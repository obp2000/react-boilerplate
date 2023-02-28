import { Translation } from '@/app/i18n/dictionaries'
import type { Customer, Values as CustomerValues } from '@/app/customers/calculator'
import type { CustomerFormProps } from '@/app/customers/CustomerForm'
import type { Order, Values as OrderValues } from '@/app/orders/calculator'
import type { OrderFormProps } from '@/app/orders/OrderForm'
import type { Product, Values as ProductValues } from '@/app/products/calculator'
import type { ProductFormProps } from '@/app/products/ProductForm'

type getCustomer = (id: number) => Promise<Customer>
type getProduct = (id: number) => Promise<Product>
type getOrder = (id: number) => Promise<Order>

const getObject = {
	customers: () => import('@/app/customers/serverHelpers').then(({ getObject }) => getObject),
	products: () => import('@/app/products/serverHelpers').then(({ getObject }) => getObject),
	orders: () => import('@/app/orders/serverHelpers').then(({ getObject }) => getObject),
}

export async function getGetObject(table: string): Promise<getCustomer>
export async function getGetObject(table: string): Promise<getProduct>
export async function getGetObject(table: string): Promise<getOrder>
export async function getGetObject(table: string) {
	return getObject[table as keyof typeof getObject]()
}

type getCustomerInitialValues = ({ object }: { object?: Customer }) => CustomerValues
type getProductInitialValues = ({ object }: { object?: Product }) => ProductValues
type getOrderInitialValues = ({ object }: { object?: Order }) => OrderValues

const getInitialValues = {
	customers: () => import('@/app/customers/serverHelpers').then(({ getInitialValues }) => getInitialValues),
	products: () => import('@/app/products/serverHelpers').then(({ getInitialValues }) => getInitialValues),
	orders: () => import('@/app/orders/serverHelpers').then(({ getInitialValues }) => getInitialValues),
}

export async function getGetInitialValues(table: string): Promise<getCustomerInitialValues>
export async function getGetInitialValues(table: string): Promise<getProductInitialValues>
export async function getGetInitialValues(table: string): Promise<getOrderInitialValues>
export async function getGetInitialValues(table: string) {
	return getInitialValues[table as keyof typeof getInitialValues]()
}

type customerLabels = (dict: Translation) => {
	notFound: Translation['not_found'],
	labels: Translation['customer']
}
type productLabels = (dict: Translation) => { labels: Translation['product'] }
type orderLabels = (dict: Translation) => {
	add: Translation['add'],
	textDelete: Translation['delete'],
	notFound: Translation['not_found'],
	count: Translation['count'],
	labels: Translation['order'],
	label: Translation['delete'],
	okText: Translation['yes'],
	cancelText: Translation['no'],
	customerLabels: Translation['customer'],
	productLabels: Translation['product'],
}

const labels = {
	customers: () => import('@/app/customers/serverHelpers').then(({ labels }) => labels),
	products: () => import('@/app/products/serverHelpers').then(({ labels }) => labels),
	orders: () => import('@/app/orders/serverHelpers').then(({ labels }) => labels),
}

export async function getLabels(table: string): Promise<customerLabels>
export async function getLabels(table: string): Promise<productLabels>
export async function getLabels(table: string): Promise<orderLabels>
export async function getLabels(table: string) {
	return labels[table as keyof typeof labels]()
}

const options = {
	customers: () => import('@/app/customers/serverHelpers').then(({ getOptions }) => getOptions),
	products: () => import('@/app/products/serverHelpers').then(({ getOptions }) => getOptions),
	orders: () => import('@/app/orders/serverHelpers').then(({ getOptions }) => getOptions),
}

export async function getGetOptions(table: string) {
	return options[table as keyof typeof options]()
}

const form = {
	customers: () => import('@/app/customers/CustomerForm').then((module) => module.default),
	products: () => import('@/app/products/ProductForm').then((module) => module.default),
	orders: () => import('@/app/orders/OrderForm').then((module) => module.default),
}

export async function getForm(table: string): Promise<(props: CustomerFormProps) => JSX.Element>
export async function getForm(table: string): Promise<(props: ProductFormProps) => JSX.Element>
export async function getForm(table: string): Promise<(props: OrderFormProps) => JSX.Element>
export async function getForm(table: string) {
	return form[table as keyof typeof form]()
}

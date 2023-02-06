import { Translation } from '@/app/i18n/dictionaries'
import type { Values as CustomerValues } from '@/app/[lng]/customers/[id]/calculator'
import type { CustomerFormProps } from '@/app/[lng]/customers/[id]/CustomerForm'
import type { Customer } from '@/app/[lng]/customers/[id]/helpers'
import type { Values as OrderValues } from '@/app/[lng]/orders/[id]/calculator'
import type { Order } from '@/app/[lng]/orders/[id]/helpers'
import type { OrderFormProps } from '@/app/[lng]/orders/[id]/OrderForm'
import type { Values as ProductValues } from '@/app/[lng]/products/[id]/calculator'
import type { Product } from '@/app/[lng]/products/[id]/helpers'
import type { ProductFormProps } from '@/app/[lng]/products/[id]/ProductForm'

type getCustomer = (id: number) => Promise<Customer>
type getProduct = (id: number) => Promise<Product>
type getOrder = (id: number) => Promise<Order>

const getObject = {
	customers: () => import('@/app/[lng]/customers/[id]/serverHelpers').then(({ getObject }) => getObject),
	products: () => import('@/app/[lng]/products/[id]/serverHelpers').then(({ getObject }) => getObject),
	orders: () => import('@/app/[lng]/orders/[id]/serverHelpers').then(({ getObject }) => getObject),
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
	customers: () => import('@/app/[lng]/customers/[id]/serverHelpers').then(({ getInitialValues }) => getInitialValues),
	products: () => import('@/app/[lng]/products/[id]/serverHelpers').then(({ getInitialValues }) => getInitialValues),
	orders: () => import('@/app/[lng]/orders/[id]/serverHelpers').then(({ getInitialValues }) => getInitialValues),
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
	customers: () => import('@/app/[lng]/customers/[id]/serverHelpers').then(({ labels }) => labels),
	products: () => import('@/app/[lng]/products/[id]/serverHelpers').then(({ labels }) => labels),
	orders: () => import('@/app/[lng]/orders/[id]/serverHelpers').then(({ labels }) => labels),
}

export async function getLabels(table: string): Promise<customerLabels>
export async function getLabels(table: string): Promise<productLabels>
export async function getLabels(table: string): Promise<orderLabels>
export async function getLabels(table: string) {
	return labels[table as keyof typeof labels]()
}

const options = {
	customers: () => import('@/app/[lng]/customers/[id]/serverHelpers').then(({ options }) => options),
	products: () => import('@/app/[lng]/products/[id]/serverHelpers').then(({ options }) => options),
	orders: () => import('@/app/[lng]/orders/[id]/serverHelpers').then(({ options }) => options),
}

export async function getOptions(table: string) {
	return options[table as keyof typeof options]()
}

const form = {
	customers: () => import('@/app/[lng]/customers/[id]/CustomerForm').then((module) => module.default),
	products: () => import('@/app/[lng]/products/[id]/ProductForm').then((module) => module.default),
	orders: () => import('@/app/[lng]/orders/[id]/OrderForm').then((module) => module.default),
}

export async function getForm(table: string): Promise<(props: CustomerFormProps) => JSX.Element>
export async function getForm(table: string): Promise<(props: ProductFormProps) => JSX.Element>
export async function getForm(table: string): Promise<(props: OrderFormProps) => JSX.Element>
export async function getForm(table: string) {
	return form[table as keyof typeof form]()
}

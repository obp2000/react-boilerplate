import Form from './_components/Form'
import { ObjectPage } from '@/app/_objects/ObjectPage'

import type { Translation } from '@/app/i18n/dictionaries'

function labels({
  add,
  delete: textDelete,
  not_found: notFound,
  count,
  order: labels,
  yes: okText,
  no: cancelText,
  customer,
  product,
}: Translation) {
  return {
    add,
    textDelete,
    notFound,
    count,
    labels,
    label: textDelete,
    okText,
    cancelText,
    customer,
    product,
  }
}

export default async function Page({
	params
}: { params: { lng: string, id: string } }) {
	const table = 'orders'
	return <ObjectPage {...{
		params,
		table,
		labels,
		form: Form,
	}} />
}

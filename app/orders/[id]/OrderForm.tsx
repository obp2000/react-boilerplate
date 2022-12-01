import 'server-only'

import { indexUrl } from '@/app/orders/serverConfig'
import { getObject, mainContext } from '@/services/api/server'
import { MainProvider } from '@/services/context'
import { notFound } from 'next/navigation'
import OrderFormClient from './OrderFormClient'
import { getInitialValues } from './helpers'

export default async function Form({ id }: {id: string}) {
  const object = await getObject(indexUrl, id)
  if (!object) { notFound() }
  const optionsData = await mainContext(indexUrl)
  const initialValues = getInitialValues({ object })
  return <MainProvider {...optionsData}>
    <OrderFormClient {...{ id, initialValues }} />
  </MainProvider>
}

import 'server-only'

import { indexUrl } from '@/app/products/serverConfig'
import { ProductOptionsType } from '@/interfaces/products'
import { getObject } from '@/services/api/server'
import { MainProvider } from '@/services/context'
import { notFound } from 'next/navigation'
import { getInitialValues } from './helpers'
import ProductFormClient from './ProductFormClient'
import { getOptions } from '@/services/api/options'

export default async function Form({ id }: {id: string}) {
  const object = await getObject(indexUrl, id)
  if (!object) { notFound() }
  const optionsData = await getOptions(indexUrl)
  const { options } = optionsData as ProductOptionsType
  const initialValues = getInitialValues({ object, options })
  return <MainProvider {...optionsData}>
    <ProductFormClient {...{ id, initialValues }} />
  </MainProvider>
}

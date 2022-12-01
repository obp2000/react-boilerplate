import 'server-only'

import { indexUrl } from '@/app/customers/serverConfig'
import { getAuth, getObject } from '@/services/api/server'
import { notFound } from 'next/navigation'
import CustomerFormClient from './CustomerFormClient'
import { getInitialValues } from './helpers'
import { getOptions } from '@/services/api/options'

export default async function Form({ id }: {id: string}) {
  const object = await getObject(indexUrl, id)
  if (!object) { notFound() }
  const { accessToken } = getAuth()
  const optionsData = await getOptions(indexUrl)
  const initialValues = getInitialValues({ object })
  // console.log('customer form server')
  return <CustomerFormClient {...{ id, initialValues, ...optionsData, accessToken }} />
  // return 'customer form'
}

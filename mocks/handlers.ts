import { getDictionary } from '@/app/i18n/dictionaries'
import type { Values as CustomerValues } from '@/interfaces/customers'
import { rest } from 'msw'
import cities from './cities.json'
import user from './user.json'

const baseUrl = '/api'

const handlers = [
  rest.post(`${baseUrl}/ru/customers`, async (req, res, ctx) => {
    // console.log('create handler')
    const values: CustomerValues = await req.json()
    const result = {
      id: 100,
      nick: values?.nick,
      name: values?.name,
      cityId: values?.cityId,
      address: values?.address,
      createdAt: new Date('16.05.2022 21:42:22'),
      updatedAt: new Date('16.05.2022 21:42:22'),
    }
    const { successfully, customers, created } = await getDictionary('ru')
    const message = `${customers.singular} ${successfully.toLowerCase()} ${created}`
    return res(ctx.json({ message }))
  }),
  rest.put(`${baseUrl}/ru/customers/:id`, async (req, res, ctx) => {
    const values: CustomerValues = await req.json()
    const result = {
      id: parseInt(req.params.id as string),
      nick: values?.nick,
      name: values?.name,
      cityId: values?.cityId,
      address: values?.address,
      createdAt: values?.createdAt,
      updatedAt: "2022-08-14T23:45:58.702044+03:00",
    }
    const { successfully, customers, updated } = await getDictionary('ru')
    const message = `${customers.singular} ${successfully.toLowerCase()} ${updated}`
    return res(ctx.json({ message }))
  }),
  rest.delete(`${baseUrl}/ru/customers/:id`, async (_req, res, ctx) => {
    const { successfully, customers, deleted } = await getDictionary('ru')
    const message = `${customers.singular} ${successfully.toLowerCase()} ${deleted}`
    return res(ctx.json({ message }))
  }),
  rest.get(`${baseUrl}/cities`, (req, res, ctx) => {
    // console.log('mock cities')
    const result = req.url.searchParams.get('term') === 'Фу' ? cities : {}
    return res(ctx.json(result))
  }),
  rest.get(`${baseUrl}/user`, (_req, res, ctx) => {
    // console.log('get user')
    return res(ctx.json(user))
  }),
  // rest.options(`${baseUrl}/customers/`, (_req, res, ctx) => {
  //   return res(ctx.json(optionsData))
  // }),
  // rest.get(`${baseUrl}/customers/:id`, (req, res, ctx) => {
  //   // console.log('request get customer ', req.params.id)
  //   // console.log('get customer...........................')
  //   const object = objects.results.find(({ id }) =>
  //     id === parseInt(req.params.id as string))
  //   // console.log('customer ', customer)
  //   return res(ctx.json(object))
  // }),
  // rest.get(`${baseUrl}/customers`, (_req, res, ctx) => {
  //   console.log('get customers...........................')
  //   return res(ctx.json(objects))
  // }),
]

export default handlers

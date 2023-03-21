import type { Values as CustomerValues } from '@/interfaces/customers'
import { rest } from 'msw'
import cities from './cities.json'
import user from './user.json'

const baseUrl = '/api'

export default [
  rest.post(`${baseUrl}/customers`, async (req, res, ctx) => {
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
    return res(ctx.json(result))
  }),
  rest.put(`${baseUrl}/customers/:id`, async (req, res, ctx) => {
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
    return res(ctx.json(result))
  }),
  rest.delete(`${baseUrl}/customers/:id`, (_req, res, ctx) => {
    console.log('delete handler')
    return res(ctx.json({}))
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

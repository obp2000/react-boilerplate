import type { Values as CustomerValues } from '@/app/customers/calculator'
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
      city: values?.city,
      address: values?.address,
      created_at: new Date('16.05.2022 21:42:22'),
      updated_at: new Date('16.05.2022 21:42:22'),
    }
    return res(ctx.json(result))
  }),
  rest.put(`${baseUrl}/customers/:id`, async (req, res, ctx) => {
    const values: CustomerValues = await req.json()
    // const city = cities.find(({ id }) => id === values?.city_id)
    const result = {
      id: parseInt(req.params.id as string),
      nick: values?.nick,
      name: values?.name,
      city: values?.city,
      address: values?.address,
      created_at: values?.created_at,
      updated_at: "2022-08-14T23:45:58.702044+03:00",
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


// const newCustomer = ({
//   nick,
//   name,
//   city_id,
//   address,
// }: Customer) => ({
//   id: 100,
//   nick,
//   name,
//   city: cities.find(({ id }) => id === city_id),
//   address,
//   created_at: new Date('16.05.2022 21:42:22'),
//   updated_at: new Date('16.05.2022 21:42:22'),
// })


// export const objects = {
//   'totalCount': 24,
//   'totalPages': 3,
//   'results': [{
//     'id': 34,
//     'nick': 'oleg4',
//     'name': 'dddd mocks',
//     'city': {
//       'id': 22799,
//       'pindex': '410049',
//       'city': 'Саратов',
//     },
//     'address': 'ыафыафафыа',
//     "created_at": "2022-01-28T11:24:35.286490+03:00",
//     "updated_at": "2022-08-19T23:30:43.274130+03:00",
//   },
//   {
//     'id': 79,
//     'nick': 'ыыыыы',
//     'name': 'aaaa',
//     'city': {
//       'id': 22765,
//       'pindex': '410001',
//       'city': 'Саратов',
//     },
//     'address': '',
//     "created_at": "2022-02-01T18:52:26.630389+03:00",
//     "updated_at": "2022-08-19T23:24:58.498819+03:00",
//   },
//   {
//     'id': 59,
//     'nick': 'oleg4',
//     'name': 'sasasa',
//     'city': {
//       'id': 14463,
//       'pindex': '346962',
//       'city': 'Александровка, 61, Матвеево-Курганский',
//     },
//     'address': '',
//     "created_at": "2022-01-28T17:35:21.329605+03:00",
//     "updated_at": "2022-08-19T16:02:54.367960+03:00",
//   },
//   {
//     'id': 58,
//     'nick': 'oleg4',
//     'name': 'fffff',
//     'city': {
//       'id': 24,
//       'pindex': '101760',
//       'city': 'Москва',
//     },
//     'address': '',
//     "created_at": "2022-08-14T23:24:24.473169+03:00",
//     "updated_at": "2022-08-17T19:58:05.350752+03:00",
//   },
//   {
//     'id': 46,
//     'nick': 'oleg4',
//     'name': 'dy4',
//     'city': {
//       'id': 26588,
//       'pindex': '430000',
//       'city': 'Саранск',
//     },
//     'address': 'ыафыафафыа',
//     "created_at": "2022-08-16T13:07:57.579899+03:00",
//     "updated_at": "2022-08-16T13:07:57.579939+03:00",
//   },
//   {
//     'id': 39,
//     'nick': 'oleg5',
//     'name': 'd',
//     'city': {
//       'id': 32351,
//       'pindex': '600000',
//       'city': 'Владимир',
//     },
//     'address': 'gggggggggg',
//     "created_at": "2022-07-15T18:11:55.583758+03:00",
//     "updated_at": "2022-08-15T01:13:25.962097+03:00",
//   },
//   {
//     'id': 76,
//     'nick': 'Test1',
//     'name': 'ккhhhhh',
//     'city': {
//       'id': 3098,
//       'pindex': '156000',
//       'city': 'Кострома',
//     },
//     'address': '',
//     "created_at": "2022-05-16T21:42:22.005831+03:00",
//     "updated_at": "2022-08-15T01:03:40.901699+03:00",
//   },
//   {
//     'id': 77,
//     'nick': 'Олег',
//     'name': '',
//     'city': {
//       'id': 2785,
//       'pindex': '153038',
//       'city': 'Иваново',
//     },
//     'address': '',
//     "created_at": "2022-08-14T23:45:58.701990+03:00",
//     "updated_at": "2022-08-14T23:45:58.702044+03:00",
//   },
//   ],
// }




// import 'whatwg-fetch'
// import { baseUrl } from '@/services/config'
// import type { Customer } from '@/interfaces/customers'

// export const optionsData = {
//   "name": "Customer List",
//   "description": "API endpoint that allows customers to be viewed or edited.",
//   "renders": [
//     "application/json",
//     "text/html"
//   ],
//   "parses": [
//     "application/json",
//     "application/x-www-form-urlencoded",
//     "multipart/form-data"
//   ],
//   "actions": {
//     "POST": {
//       "id": {
//         "type": "integer",
//         "required": false,
//         "read_only": true,
//         "label": "ID"
//       },
//       "nick": {
//         "type": "string",
//         "required": true,
//         "read_only": false,
//         "label": "Ник",
//         "max_length": 255
//       },
//       "name": {
//         "type": "string",
//         "required": false,
//         "read_only": false,
//         "label": "Имя",
//         "max_length": 255
//       },
//       "city": {
//         "type": "nested object",
//         "required": true,
//         "read_only": false,
//         "label": "Город",
//         "children": {
//           "id": {
//             "type": "integer",
//             "required": false,
//             "read_only": true,
//             "label": "ID"
//           },
//           "pindex": {
//             "type": "string",
//             "required": false,
//             "read_only": false,
//             "label": "Индекс",
//             "max_length": 6
//           },
//           "city": {
//             "type": "string",
//             "required": true,
//             "read_only": false,
//             "label": "Город",
//             "max_length": 80
//           }
//         }
//       },
//       "address": {
//         "type": "string",
//         "required": false,
//         "read_only": false,
//         "label": "Адрес",
//         "max_length": 255
//       },
//       "created_at": {
//         "type": "datetime",
//         "required": false,
//         "read_only": true,
//         "label": "Создан"
//       },
//       "updated_at": {
//         "type": "datetime",
//         "required": false,
//         "read_only": true,
//         "label": "Обновлен"
//       },
//       "name_singular": "Покупатель",
//       "name_plural": "Покупатели"
//     }
//   },
//   "common_consts": {
//     "new": "Новый",
//     "edit": "Редактировать",
//     "delete": "Удалить",
//     "add": "Добавить",
//     "save": "Сохранить",
//     "successfully": "Успешно!",
//     "yes": "Да",
//     "no": "Нет",
//     "search": "Поиск",
//     "login": "Войти",
//     "register": "Регистрация",
//     "main_menu": [
//       {
//         "path": "/",
//         "label": "Главная"
//       },
//       {
//         "path": "/customers/",
//         "label": "Покупатели"
//       },
//       {
//         "path": "/products/",
//         "label": "Ткани"
//       },
//       {
//         "path": "/orders/",
//         "label": "Заказы"
//       },
//       {
//         "path": "/user/",
//         "label": "Пользователь"
//       }
//     ],
//     "auth_menu_item": {
//       "path": "/logout/",
//       "label": "Выйти"
//     },
//     "brandText": "Best & C",
//     "error_messages": {
//       "invalid_choice": "Значения %(value)r нет среди допустимых вариантов.",
//       "null": "Это поле не может иметь значение NULL.",
//       "blank": "Это поле не может быть пустым.",
//       "unique": "%(model_name)s с таким %(field_label)s уже существует.",
//       "unique_for_date": "Значение в поле «%(field_label)s» должно быть уникальным для фрагмента «%(lookup_type)s» даты в поле %(date_field_label)s.",
//       "password_mismatch": "Введенные пароли не совпадают.",
//       "invalid_email": "Введите правильный адрес электронной почты.",
//       "short_password": "Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.",
//       "not_integer": "Введите правильное число."
//     },
//     "from": "от",
//     "back": "Назад",
//     "not_found": "Не найдено",
//     "count": "Рассчитать"
//   }
// }

// export const options = optionsData.actions.POST

// export const commonConsts = optionsData.common_consts


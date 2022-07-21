import {rest} from 'msw'
import {baseUrl} from '../services/apiSlice'

export const optionsData = {
  'name': 'Customer List',
  'description': 'API endpoint that allows customers to be viewed or edited.',
  'renders': [
    'application/json',
    'text/html',
  ],
  'parses': [
    'application/json',
    'application/x-www-form-urlencoded',
    'multipart/form-data',
  ],
  'actions': {
    'POST': {
      'id': {
        'type': 'integer',
        'required': false,
        'read_only': true,
        'label': 'ID',
      },
      'nick': {
        'type': 'string',
        'required': true,
        'read_only': false,
        'label': 'Ник',
        'max_length': 255,
      },
      'name': {
        'type': 'string',
        'required': false,
        'read_only': false,
        'label': 'Имя',
        'max_length': 255,
      },
      'city': {
        'type': 'nested object',
        'required': true,
        'read_only': false,
        'label': 'Город',
        'children': {
          'id': {
            'type': 'integer',
            'required': false,
            'read_only': true,
            'label': 'ID',
          },
          'pindex': {
            'type': 'string',
            'required': false,
            'read_only': false,
            'label': 'Индекс',
            'max_length': 6,
          },
          'city': {
            'type': 'string',
            'required': true,
            'read_only': false,
            'label': 'Город',
            'max_length': 80,
          },
        },
      },
      'address': {
        'type': 'string',
        'required': false,
        'read_only': false,
        'label': 'Адрес',
        'max_length': 255,
      },
      'created_at': {
        'type': 'datetime',
        'required': false,
        'read_only': true,
        'label': 'Создан',
      },
      'updated_at': {
        'type': 'datetime',
        'required': false,
        'read_only': true,
        'label': 'Обновлен',
      },
      'name_singular': 'Покупатель',
      'name_plural': 'Покупатели',
    },
  },
  'common_consts': {
    'new': 'Новый',
    'edit': 'Редактировать',
    'delete': 'Удалить',
    'add': 'Добавить',
    'save': 'Сохранить',
    'successfully': 'Успешно!',
    'yes': 'Да',
    'no': 'Нет',
    'search': 'Поиск',
    'login': 'Войти',
    'register': 'Регистрация',
    'main_menu': [
      {
        'path': '/',
        'label': 'Главная',
      },
      {
        'path': '/customers/',
        'label': 'Покупатели',
      },
      {
        'path': '/products/',
        'label': 'Ткани',
      },
      {
        'path': '/orders/',
        'label': 'Заказы',
      },
      {
        'path': '/user/',
        'label': 'Пользователь',
      },
    ],
    'auth_menu_item': {
      'path': '/logout/',
      'label': 'Выйти',
    },
    'brand_text': 'Best & C',
    'error_messages': {
      'invalid_choice': 'Значения %(value)r нет среди допустимых вариантов.',
      'null': 'Это поле не может иметь значение NULL.',
      'blank': 'Это поле не может быть пустым.',
      'unique': '%(model_name)s с таким %(field_label)s уже существует.',
      'unique_for_date': 'Значение в поле «%(field_label)s» должно быть' +
        ' уникальным для фрагмента «%(lookup_type)s» даты' +
        ' в поле %(date_field_label)s.',
      'password_mismatch': 'Введенные пароли не совпадают.',
      'invalid_email': 'Введите правильный адрес электронной почты.',
      'short_password': 'Введённый пароль слишком короткий. ' +
        'Он должен содержать как минимум 8 символов.',
      'not_integer': 'Введите правильное число.',
    },
    'from': 'от',
    'back': 'Назад',
    'not_found': 'Не найдено',
  },
}

export const options = optionsData.actions.POST

export const commonConsts = optionsData.common_consts

export const objects = {
  'totalCount': 24,
  'totalPages': 3,
  'results': [{
    'id': 34,
    'nick': 'oleg4',
    'name': 'dddd',
    'city': {
      'id': 22799,
      'pindex': '410049',
      'city': 'Саратов',
    },
    'address': 'ыафыафафыа',
    'created_at': '18.01.2022 17:38:01',
    'updated_at': '02.04.2022 18:12:32',
  },
  {
    'id': 79,
    'nick': 'ыыыыы',
    'name': 'aaaa',
    'city': {
      'id': 22765,
      'pindex': '410001',
      'city': 'Саратов',
    },
    'address': '',
    'created_at': '31.03.2022 18:22:17',
    'updated_at': '01.04.2022 19:49:34',
  },
  {
    'id': 59,
    'nick': 'oleg4',
    'name': 'sasasa',
    'city': {
      'id': 14463,
      'pindex': '346962',
      'city': 'Александровка, 61, Матвеево-Курганский',
    },
    'address': '',
    'created_at': '30.01.2022 15:09:10',
    'updated_at': '29.03.2022 23:45:52',
  },
  {
    'id': 58,
    'nick': 'oleg4',
    'name': 'fffff',
    'city': {
      'id': 24,
      'pindex': '101760',
      'city': 'Москва',
    },
    'address': '',
    'created_at': '30.01.2022 14:56:06',
    'updated_at': '29.03.2022 23:35:16',
  },
  {
    'id': 46,
    'nick': 'oleg4',
    'name': 'dy4',
    'city': {
      'id': 26588,
      'pindex': '430000',
      'city': 'Саранск',
    },
    'address': 'ыафыафафыа',
    'created_at': '23.01.2022 11:35:40',
    'updated_at': '28.03.2022 21:09:08',
  },
  {
    'id': 39,
    'nick': 'oleg5',
    'name': 'd',
    'city': {
      'id': 32351,
      'pindex': '600000',
      'city': 'Владимир',
    },
    'address': 'gggggggggg',
    'created_at': '18.01.2022 17:50:32',
    'updated_at': '26.03.2022 12:40:03',
  },
  {
    'id': 76,
    'nick': 'Test1',
    'name': 'ккhhhhh',
    'city': {
      'id': 3098,
      'pindex': '156000',
      'city': 'Кострома',
    },
    'address': '',
    'created_at': '19.03.2022 22:32:29',
    'updated_at': '22.03.2022 21:26:46',
  },
  {
    'id': 77,
    'nick': 'Олег',
    'name': '',
    'city': {
      'id': 2785,
      'pindex': '153038',
      'city': 'Иваново',
    },
    'address': '',
    'created_at': '19.03.2022 22:36:00',
    'updated_at': '19.03.2022 22:36:00',
  },
  ],
}

export const cities = {
  'totalCount': 18,
  'totalPages': 1,
  'results': [
    {
      'id': 29777,
      'pindex': '452701',
      'city': 'Гафури, 2',
    },
    {
      'id': 30063,
      'pindex': '453074',
      'city': 'Мраково, 2, Гафурийский',
    },
    {
      'id': 30064,
      'pindex': '453075',
      'city': 'Павловка, 2, Гафурийский',
    },
    {
      'id': 33348,
      'pindex': '606623',
      'city': 'Фундриково, 52',
    },
    {
      'id': 41667,
      'pindex': '659074',
      'city': 'Фунтики, 22',
    },
    {
      'id': 23963,
      'pindex': '416472',
      'city': 'Фунтово-1, 30',
    },
    {
      'id': 2979,
      'pindex': '155520',
      'city': 'Фурманов, 37',
    },
    {
      'id': 2980,
      'pindex': '155521',
      'city': 'Фурманов, 37',
    },
    {
      'id': 2981,
      'pindex': '155523',
      'city': 'Фурманов, 37',
    },
    {
      'id': 2982,
      'pindex': '155524',
      'city': 'Фурманов, 37',
    },
    {
      'id': 2983,
      'pindex': '155526',
      'city': 'Фурманов, 37',
    },
    {
      'id': 2986,
      'pindex': '155536',
      'city': 'Фурманов, 37',
    },
    {
      'id': 2987,
      'pindex': '155537',
      'city': 'Фурманов, 37',
    },
    {
      'id': 2988,
      'pindex': '155539',
      'city': 'Фурманов, 37',
    },
    {
      'id': 32054,
      'pindex': '461984',
      'city': 'Фурманов, 56',
    },
    {
      'id': 9310,
      'pindex': '238013',
      'city': 'Фурмановка, 39',
    },
    {
      'id': 9325,
      'pindex': '238042',
      'city': 'Фурманово, 39',
    },
    {
      'id': 23357,
      'pindex': '413086',
      'city': 'Фурманово, 64',
    },
  ],
}

const newCustomer = ({
  id,
  nick,
  name,
  city_id,
  address,
}) => ({
  id: 100,
  nick,
  name,
  city: cities.results.find(({id}) => id === city_id),
  address,
  created_at: '16.05.2022 21:42:22',
  updated_at: '16.05.2022 21:42:22',
})


const user = {
    pk: 3,
    username: "oleg2",
    email: "obp2000@test.com",
    first_name: "",
    last_name: ""
}

export const handlers = [
  // rest.get(`${baseUrl}/customers/new`, (req, res, ctx) => {
  //   return res(ctx.json(objects[0]))
  // }),
  rest.options(`${baseUrl}/customers/`, (req, res, ctx) => {
    return res(ctx.json(optionsData))
  }),
  rest.get(`${baseUrl}/customers/:id/`, (req, res, ctx) => {
    // console.log('request get customer ', req.params.id)
    const object = objects.results.find(({id}) => id === parseInt(req.params.id))
    // console.log('customer ', customer)
    return res(ctx.json(object))
  }),
  rest.get(`${baseUrl}/customers/`, (req, res, ctx) => {
    return res(ctx.json(objects))
  }),
  rest.post(`${baseUrl}/customers/`, (req, res, ctx) => {
    // console.log('body ', req.body)
    const result = newCustomer(req.body)
    // console.log('result ', result)
    return res(ctx.json(result))
  }),
  rest.delete(`${baseUrl}/customers/:id`, (req, res, ctx) => {
    // console.log('params ', req.params.id)
    return res(ctx.json({}))
  }),
  rest.put(`${baseUrl}/customers/:id/`, (req, res, ctx) => {
    // console.log('body ', req.body)
    const city = cities.results.find(({id}) => id === req.body.city_id)
    const result = {
      id: parseInt(req.params.id),
      nick: req.body.nick,
      name: req.body.name,
      city,
      address: req.body.address,
      created_at: req.body.created_at,
      updated_at: '17.05.2022 21:42:22',
    }
    // console.log('result ', result)
    return res(ctx.json(result))
  }),
  rest.get(`${baseUrl}/cities`, (req, res, ctx) => {
    // console.log('term ', req.url.searchParams.get('term'))
    // console.log('page_size ', req.url.searchParams.get('page_size'))
    const result = req.url.searchParams.get('term') === 'Фу' ? cities : {}
    return res(ctx.json(result))
  }),
  rest.get(`${baseUrl}/user/`, (req, res, ctx) => {
    return res(ctx.json(user))
  }),
]

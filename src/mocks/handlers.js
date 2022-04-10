import { rest } from 'msw'
import config from '../components/Config'

const options = {
    "name": "Customer List",
    "description": "API endpoint that allows customers to be viewed or edited.",
    "renders": [
        "application/json",
        "text/html"
    ],
    "parses": [
        "application/json",
        "application/x-www-form-urlencoded",
        "multipart/form-data"
    ],
    actions: {
        POST: {
            "id": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "ID"
            },
            "nick": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "Ник",
                "max_length": 255
            },
            "name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Имя",
                "max_length": 255
            },
            "city": {
                "type": "nested object",
                "required": true,
                "read_only": false,
                "label": "Город",
                "children": {
                    "id": {
                        "type": "integer",
                        "required": false,
                        "read_only": true,
                        "label": "ID"
                    },
                    "pindex": {
                        "type": "string",
                        "required": false,
                        "read_only": false,
                        "label": "Индекс",
                        "max_length": 6
                    },
                    "city": {
                        "type": "string",
                        "required": true,
                        "read_only": false,
                        "label": "Город",
                        "max_length": 80
                    }
                }
            },
            "address": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "Адрес",
                "max_length": 255
            },
            "created_at": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "Создан"
            },
            "updated_at": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "Обновлен"
            },
            "name_singular": "Покупатель",
            "name_plural": "Покупатели",
            "common_consts": {
                "new": "Новый",
                "edit": "Редактировать",
                "delete": "Удалить",
                "add": "Добавить",
                "save": "Сохранить",
                "successfully": "Успешно!",
                "yes": "Да",
                "no": "Нет",
                "search": "Поиск",
                "login": "Войти",
                "register": "Регистрация",
                "main_menu": [{
                        "path": "/",
                        "label": "Главная"
                    },
                    {
                        "path": "/customers/",
                        "label": "Покупатели"
                    },
                    {
                        "path": "/products/",
                        "label": "Ткани"
                    },
                    {
                        "path": "/orders/",
                        "label": "Заказы"
                    }
                ],
                "auth_menu_item": {
                    "path": "/login/",
                    "label": "Войти"
                },
                "brand_text": "Best & C",
                "error_messages": {
                    "invalid_choice": "Значения %(value)r нет среди допустимых вариантов.",
                    "null": "Это поле не может иметь значение NULL.",
                    "blank": "Это поле не может быть пустым.",
                    "unique": "%(model_name)s с таким %(field_label)s уже существует.",
                    "unique_for_date": "Значение в поле «%(field_label)s» должно быть уникальным для фрагмента «%(lookup_type)s» даты в поле %(date_field_label)s.",
                    "password_mismatch": "Введенные пароли не совпадают.",
                    "invalid_email": "Введите правильный адрес электронной почты.",
                    "short_password": "Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.",
                    "not_integer": "Введите правильное число."
                }
            }
        }
    }
}

const objects = {
    "totalCount": 24,
    "totalPages": 3,
    "results": [{
            "id": 34,
            "nick": "oleg4",
            "name": "dddd",
            "city": {
                "id": 22799,
                "pindex": "410049",
                "city": "Саратов"
            },
            "address": "ыафыафафыа",
            "created_at": "18.01.2022 17:38:01",
            "updated_at": "02.04.2022 18:12:32"
        },
        {
            "id": 79,
            "nick": "ыыыыы",
            "name": "aaaa",
            "city": {
                "id": 22765,
                "pindex": "410001",
                "city": "Саратов"
            },
            "address": "",
            "created_at": "31.03.2022 18:22:17",
            "updated_at": "01.04.2022 19:49:34"
        },
        {
            "id": 59,
            "nick": "oleg4",
            "name": "sasasa",
            "city": {
                "id": 14463,
                "pindex": "346962",
                "city": "Александровка, 61, Матвеево-Курганский"
            },
            "address": "",
            "created_at": "30.01.2022 15:09:10",
            "updated_at": "29.03.2022 23:45:52"
        },
        {
            "id": 58,
            "nick": "oleg4",
            "name": "fffff",
            "city": {
                "id": 24,
                "pindex": "101760",
                "city": "Москва"
            },
            "address": "",
            "created_at": "30.01.2022 14:56:06",
            "updated_at": "29.03.2022 23:35:16"
        },
        {
            "id": 46,
            "nick": "oleg4",
            "name": "dy4",
            "city": {
                "id": 26588,
                "pindex": "430000",
                "city": "Саранск"
            },
            "address": "ыафыафафыа",
            "created_at": "23.01.2022 11:35:40",
            "updated_at": "28.03.2022 21:09:08"
        },
        {
            "id": 39,
            "nick": "oleg5",
            "name": "d",
            "city": {
                "id": 32351,
                "pindex": "600000",
                "city": "Владимир"
            },
            "address": "gggggggggg",
            "created_at": "18.01.2022 17:50:32",
            "updated_at": "26.03.2022 12:40:03"
        },
        {
            "id": 76,
            "nick": "Test1",
            "name": "ккhhhhh",
            "city": {
                "id": 3098,
                "pindex": "156000",
                "city": "Кострома"
            },
            "address": "",
            "created_at": "19.03.2022 22:32:29",
            "updated_at": "22.03.2022 21:26:46"
        },
        {
            "id": 77,
            "nick": "Олег",
            "name": "",
            "city": {
                "id": 2785,
                "pindex": "153038",
                "city": "Иваново"
            },
            "address": "",
            "created_at": "19.03.2022 22:36:00",
            "updated_at": "19.03.2022 22:36:00"
        }
    ]
}

export const handlers = [
    rest.options(`${config.BACKEND}/api/customers/`, (req, res, ctx) => {
        const { searchParams } = req.url
        console.log('req.params options', req.params)
        // rest.get(`${config.BACKEND}/api/customers/`, (req, res, ctx) => {
        //     console.log('req get', req)
        //     return res(ctx.json(objects))
        // })
        // rest.get('*/api/', (req, res, ctx) => {
        //  console.log( 'req.url get', req.url )
        //     return res(ctx.json(objects))
        // })
        return res(ctx.json(options))
    }),
    rest.get(`${config.BACKEND}/api/customers/`, (req, res, ctx) => {
        console.log('req get', req)
        return res(ctx.json(objects))
    }),
]
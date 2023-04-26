import { object } from 'superstruct'
import { id, nick, name, cityId, address } from '@/app/customer/struct'

export const struct = object({ id, nick, name, cityId, address })

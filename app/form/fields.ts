import {
  boolean,
  coerce,
  integer,
  literal,
  min,
  number,
  optional,
  string,
  union,
  date,
  defaulted,
  define,
} from 'superstruct'

const SelectOption = define<number>('SelectOption', (value) =>
  typeof value === 'number' || value === '')

export const DigitPattern = define<number>('DigitPattern', (value) =>
  (typeof value === 'string') && /^\d+$/.test(value))

export const OptionalDigitPattern = define<number>('DigitPattern', (value) =>
  (typeof value === 'string') && /^\d*$/.test(value))

export const OptionalInteger = coerce(optional(union([integer(), OptionalDigitPattern])), string(),
  (value) => value === '' ? undefined : parseInt(value))

export const OptionalOption = coerce(optional(SelectOption), union([string(), literal('')]),
  (value) => value === '' ? undefined : parseInt(value))

export const OptionalFloat = coerce(optional(union([number(), OptionalDigitPattern])), string(),
  (value) => value === '' ? undefined : parseFloat(value))

export const OptionalBoolean = coerce(optional(boolean()), string(),
  (value) => value === 'true')

export const PositiveInteger = coerce(union([min(integer(), 1), DigitPattern]),
  string(), (value) => parseInt(value))

export const DefaultedDate = defaulted(union([date(), string()]), '')

export const OptionalDate = optional(union([date(), string()]))

export const OptionalString = optional(defaulted(string(), ''))

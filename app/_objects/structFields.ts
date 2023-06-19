import {
  boolean,
  coerce,
  integer,
  literal,
  number,
  string,
  union,
  define
} from 'superstruct'

export const IntegerPattern = define<string>('IntegerPattern', (value) =>
  (typeof value === 'string') && /^\d+$/.test(value))

export const FloatPattern = define<string>('FloatPattern', (value) =>
  (typeof value === 'string') && /^\d*\.?\d*$/.test(value))

export const IntegerOrPattern = union([integer(), IntegerPattern, literal('')])

export const ToInteger = coerce(integer(), union([IntegerPattern, literal('')]),
  (value) => value === '' || value === undefined ? null : parseInt(value))

export const Option = union([integer(), literal('')])

export const NumberOrPattern = union([number(), FloatPattern, literal('')])

export const ToFloat = coerce(number(), union([FloatPattern, literal('')]),
  (value) => value === '' ? undefined : parseFloat(value))

export const ToBoolean = coerce(boolean(), string(),
  (value) => value === 'true')

export const PositiveInteger = union([integer(), IntegerPattern])

export const ToPositiveInteger = coerce(integer(), IntegerPattern,
  (value) => parseInt(value))


// export const OptionalFloat = optional(NumberOrPattern)

// export const OptionalFloatApi = coerce(number(), union([FloatPattern, literal('')]),
//   (value) => value === '' ? undefined : parseFloat(value))

// export const OptionalBoolean = optional(boolean())

// export const DefaultedDate = defaulted(union([date(), string()]), '')

// export const OptionalDate = optional(union([date(), string()]))

// export const OptionalString = optional(defaulted(string(), ''))

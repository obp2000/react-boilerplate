import { FieldProps } from './options'

export type City = {
  id: number
  pindex: string
  city: string
}

export type CityOptions = {
  id: FieldProps
  pindex: FieldProps
  city: FieldProps
}

export type CityType = {
  object?: City
}

export type CityOptionsType = {
  options?: CityOptions
}

export type CityWithOptions = CityType & CityOptionsType

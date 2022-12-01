import type { CityWithOptions } from '@/interfaces/cities'

export default function Pindex({ object, options }: CityWithOptions) {
  if (!object?.pindex) { return null }
  return <>
    {options?.pindex?.label?.substring(0, 3).toLowerCase()}.{object.pindex}
  </>
}

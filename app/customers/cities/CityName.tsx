'use client'

import type { Translation } from "@/app/i18n/dictionaries"
import type { City } from "./helpers"

export default function CityName({
  object,
  labels
}: {
  object?: City | null
  labels: Translation['customer']['city']
}) {
  if (!object) { return null }
  return <>
    {object?.pindex &&
      `${labels.pindex.substring(0, 3).toLowerCase()}.${object.pindex} `}
    {object.city}
  </>
}

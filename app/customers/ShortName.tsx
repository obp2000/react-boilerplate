'use client'

import { Translation } from "@/app/i18n/dictionaries"
import type { Customer } from "./helpers"

export default function ShortName({
  object,
  labels
}: {
  object?: Partial<Customer>
  labels: Translation['customer']
}) {
  return <>
    {object?.nick}
    {object?.name && ` ${labels.name}: ${object.name}`}
  </>
}

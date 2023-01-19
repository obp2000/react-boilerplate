import { ReactNode } from 'react'
import { Field } from 'react-final-form'

export function ConditionIs({
  when,
  is,
  children
}: { when: string, 'is'?: boolean, children: ReactNode }
) {
  return <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
}

export function ConditionGt({
  when,
  gt,
  children
}: { when: string, gt?: number, children: ReactNode }
) {
  return <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value > Number(gt) ? children : null)}
  </Field>
}

export function ConditionGte({
  when,
  gte,
  children
}: { when: string, gte?: number, children: ReactNode }) {
  return <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value >= Number(gte) ? children : null)}
  </Field>
}

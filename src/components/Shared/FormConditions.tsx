import React, { ReactNode } from 'react'
import { Field } from 'react-final-form'

type ConditionIsProps = {
  when: string
  'is'?: boolean
  children: ReactNode
}

export const ConditionIs = ({
  when,
  is,
  children
}: ConditionIsProps): JSX.Element => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>

type ConditionGtProps = {
  when: string
  gt?: number
  children: ReactNode
}

export const ConditionGt = ({
  when,
  gt,
  children
}: ConditionGtProps): JSX.Element => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value > Number(gt) ? children : null)}
  </Field>

type ConditionGteProps = {
  when: string
  gte?: number
  children: ReactNode
}

export const ConditionGte = ({
  when,
  gte,
  children
}: ConditionGteProps) => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value >= Number(gte) ? children : null)}
  </Field>

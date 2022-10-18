import React from 'react'
import { Field } from 'react-final-form'
import type {
  ConditionIsProps,
  ConditionGtProps,
  ConditionGteProps,
} from '../../../interfaces/formConditions'

export const ConditionIs = ({
  when,
  is,
  children
}: ConditionIsProps) => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>

export const ConditionGt = ({
  when,
  gt,
  children
}: ConditionGtProps) => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value > Number(gt) ? children : null)}
  </Field>

export const ConditionGte = ({
  when,
  gte,
  children
}: ConditionGteProps) => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value >= Number(gte) ? children : null)}
  </Field>

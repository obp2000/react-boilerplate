import { FC } from 'react'
import { Field } from 'react-final-form'
import type {
  ConditionGteProps, ConditionGtProps, ConditionIsProps
} from '../../interfaces/formConditions'

export const ConditionIs: FC<ConditionIsProps> = ({
  when,
  is,
  children
}) => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>

export const ConditionGt: FC<ConditionGtProps> = ({
  when,
  gt,
  children
}) => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value > Number(gt) ? children : null)}
  </Field>

export const ConditionGte: FC<ConditionGteProps> = ({
  when,
  gte,
  children
}) => <Field name={when}
  subscription={{ value: true }}>
    {({ input: { value } }) => (value >= Number(gte) ? children : null)}
  </Field>

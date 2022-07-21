import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'

export const ConditionIs = ({when, is, children}) =>
  <Field name={when} subscription={{value: true}}>
    {({input: {value}}) => (value === is ? children : null)}
  </Field>

ConditionIs.propTypes = {
  when: PropTypes.string,
  is: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object,
  ])
}

export const ConditionGt = ({when, gt, children}) =>
    <Field name={when} subscription={{value: true}}>
      {({input: {value}}) => (value > gt ? children : null)}
    </Field>

ConditionGt.propTypes = {
  when: PropTypes.string,
  gt: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object,
  ])
}

export const ConditionGte = ({when, gte, children}) =>
    <Field name={when} subscription={{value: true}}>
      {({input: {value}}) => (value >= gte ? children : null)}
    </Field>

ConditionGte.propTypes = {
  when: PropTypes.string,
  gte: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object,
  ])
}

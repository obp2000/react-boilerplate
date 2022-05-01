import PropTypes from 'prop-types'
import React from 'react'
import NumberPicker from 'react-widgets/NumberPicker'
// import Localization from 'react-widgets/Localization'
// import { DateLocalizer, NumberLocalizer } from 'react-widgets/IntlLocalizer'

const NumberField = (props) => {
  // console.log('props: ', props)
  return <NumberPicker
    name={props.input.name}
    inputProps={{id: props.input.name}}
    placeholder={props.label}
    step={props.step}
    defaultValue={Number(props.input.value)}
    onChange={props.input.onChange}
    min={props.min}
    precision={props.precision}
    readOnly={props.read_only}
    disabled={props.disabled}
    containerClassName={props.containerClassName}
  />
}

export default NumberField


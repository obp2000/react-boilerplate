import React from 'react'
import Name from './Name'
import {Customer, CustomerOptions} from '../../../interfaces'

type Props = {
  object: Customer
  options?: CustomerOptions
}

const ShortName = ({object, options}: Props): JSX.Element => <>
  {object.nick + ' '}
  <Name {...{ object, options }} />
</>

export default ShortName

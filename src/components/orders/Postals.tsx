import React from 'react'
import { Field } from 'react-final-form'
import type { FormRenderProps } from 'react-final-form'
import { Row, Col } from 'reactstrap'
import Input from '../formInput/Input'
import FloatingFormGroup from '../formInput/FloatingFormGroup'
import SelectFloatingFormGroup from '../selectField/SelectFloatingFormGroup'
import PostCostButton from './PostCostButton'
import { OrderOptionsType, CommonConstsType } from '../../../interfaces'

type Props = FormRenderProps & CommonConstsType & OrderOptionsType

const Postals = (props: Props): JSX.Element => <tr>
  <td colSpan={4}>
    <Row>
      <Col sm={3}>
        <Field name="post_cost"
          type="number"
          step={1}
          component={FloatingFormGroup} />
      </Col>
      +
      <Col sm={2}>
        <SelectFloatingFormGroup
          name="packet"
          dataKey='value'
          textField='display_name'
          options={props.options} />
      </Col>
      =
      <Col sm={3}>
        <Field name="post_cost_with_packet"
          type="number"
          disabled
          component={FloatingFormGroup} />
      </Col>
      -
      <Col sm={3}>
        <Field name="post_discount"
          type="number"
          disabled
          component={FloatingFormGroup} />
      </Col>
    </Row>
  </td>
  <td>
    <Field name="total_postals"
      type="number"
      disabled
      component={FloatingFormGroup} />
  </td>
  <td>
    <Field name="packet_weight"
      type="number"
      disabled
      component={Input} />
  </td>
  <td>
    <PostCostButton {...props} />
  </td>
</tr>

export default Postals

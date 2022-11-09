import { FC } from 'react'
import { Field } from 'react-final-form'
import { Col, Row } from 'reactstrap'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import PostCostButton from './PostCostButton'

const Postals: FC = () => <tr>
  <td colSpan={4}>
    <Row>
      <Col sm={3}>
        <Field name="post_cost" step={1} component={FloatingFormGroup} />
      </Col>
      +
      <Col sm={2}>
        <SelectFloatingFormGroup
          name="packet"
          dataKey='value'
          textField='display_name'
        />
      </Col>
      =
      <Col sm={3}>
        <Field
          name="post_cost_with_packet" disabled component={FloatingFormGroup} />
      </Col>
      -
      <Col sm={3}>
        <Field name="post_discount" disabled component={FloatingFormGroup} />
      </Col>
    </Row>
  </td>
  <td>
    <Field name="total_postals" disabled component={FloatingFormGroup} />
  </td>
  <td>
    <Field name="packet_weight" disabled component={Input} />
  </td>
  <td>
    <PostCostButton />
  </td>
</tr>

export default Postals

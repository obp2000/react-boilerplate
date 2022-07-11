import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Row, Col} from 'reactstrap'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import PostCostButton from './PostCostButton'

const Postals = (props) => <tr>
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
                  textField='display_name' />
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

Postals.propTypes = {
  props: PropTypes.object,
}

export default Postals

import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form, Row, Col, Table } from 'reactstrap'
import { FieldArray } from 'react-final-form-arrays'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import OrderItems from '../order_items/OrderItems'
import GiftIfNeeded from './Gift'
// import PostCostButton from './PostCostButton'
import CustomerField from './CustomerField'
import FormHeader from '../Shared/FormHeader'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import Label from '../Shared/Label'
import Errors from '../Shared/Errors'
import { selectOptions } from '../redux/CommonConsts'
import { selectFromCreatedAt } from '../redux/Orders'

const OrderFormRender = props => {
    const options = { options: useSelector(selectOptions) }
    return <Form    onSubmit={props.handleSubmit}
                    className="shadow p-3 mb-5 bg-body rounded">
            {props.hasSubmitErrors && <Errors {...props} />}
            <FormHeader {...props} >
                &nbsp;{useSelector(selectFromCreatedAt)}
            </FormHeader>
            <Field  name="id"
                    {...options}
                    hidden
                    component={Input} />
            <Row>
                {/*<CustomerField {...options} />*/}
            </Row>
            <Row>
                <Col sm={2}>
                    <SelectFloatingFormGroup
                        name="delivery_type"
                        dataKey='value'
                        textField='display_name'
                        {...options} />
                </Col>
                <Col sm={6}>
                    <Field  name="address"
                            {...options}
                            component={FloatingFormGroup}/>
                    </Col>
            </Row>
            <Table size="sm" responsive bordered hover>
                <FieldArray name="order_items"
                            component={OrderItems}
                            />
                <tfoot>
                    <tr>
                        <td/>
                        <td>
                            <Field  name="total_text"
                                    disabled
                                    component={Input} />
                        </td>
                        <td/>
                        <td>
                            <Field  name="order_items_amount"
                                    type="number"
                                    disabled
                                    component={Input} />
                        </td>
                        <td>
                            <Field  name="order_items_cost"
                                    type="number"
                                    disabled
                                    component={Input} />
                        </td>
                        <td>
                            <Field  name="order_items_weight"
                                    type="number"
                                    disabled
                                    component={Input} />
                        </td>
                    </tr>
                    <GiftIfNeeded {...options} />
                    <tr>
                        <td/>
                        <td>
                            <Label  name="samples"
                                    {...options}/>
                        </td>
                        <td/>
                        <td/>
                        <td/>
                        <td>
                            <Field  name="samples_weight"
                                    type="number"
                                    disabled
                                    component={Input} />
                        </td>
                    </tr>
                    <tr>
                        <td/>
                        <td>
                            <Row>
                                <Col sm={3}>
                                    <Field  name="post_cost"
                                            type="number"
                                            component={FloatingFormGroup}
                                            {...options} />
                                </Col>
                                +
                                <Col sm={3}>
                                    <SelectFloatingFormGroup
                                        name="packet"
                                        dataKey='value'
                                        textField='display_name'
                                        {...options} />
                                </Col>
                                =
                                <Col sm={2}>
                                    <Field  name="post_cost_with_packet"
                                            type="number"
                                            disabled
                                            component={FloatingFormGroup} />
                                </Col>
                                -
                                <Col sm={3}>
                                    <Field  name="post_discount"
                                            type="number"
                                            {...options}
                                            disabled
                                            component={FloatingFormGroup} />
                                </Col>
                            </Row>
                        </td>
                        <td/>
                        <td/>
                        <td>
                            <Field  name="total_postals"
                                    type="number"
                                    {...options}
                                    disabled
                                    component={FloatingFormGroup} />
                        </td>
                        <td>
                            <Field  name="packet_weight"
                                    type="number"
                                    disabled
                                    component={Input} />
                        </td>
                    </tr>
                    <tr>
                        <td/>
                        <td>
                            <Label  name="total_sum"
                                    {...options} />
                        </td>
                        <td/>
                        <td/>
                        <td>
                            <Field  name="total_sum"
                                    type="number"
                                    disabled
                                    component={Input} />
                        </td>
                        <td>
                            <Field  name="total_weight"
                                    type="number"
                                    disabled
                                    component={Input} />
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Form>
}

export default OrderFormRender

import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field } from 'react-final-form'
import { Form, Row, Col, Table } from 'reactstrap'
import { FieldArray } from 'react-final-form-arrays'
import Loader from 'react-loader'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import OrderItems from '../order_items/OrderItems'
// import CustomerField from '../customers/CustomerField'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import CustomerName from '../customers/CustomerName'
import { Actions } from '../redux/Customers'
// import PostCostButton from './PostCostButton'
import OrderNumber from './OrderNumber'
import FormHeader from '../Shared/FormHeader'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import Label from '../Shared/Label'

const OrderFormRender = props => {
    const loaded = useSelector(({
        orders: {
            object: {
                id,
                options,
                options: {
                    order_items: {
                        child: {
                            children: order_items_props = {}
                        } = {}
                    } = {},
                    customer: {
                        children: customer_props = {}
                    } = {},
                } = {}
            } = {}
        },
        temp_state: {
            isFetching
        },
        common_consts
    }) => ({
        id,
        options,
        order_items_props,
        customer_props,
        options,
        isFetching,
        common_consts
    }))
    const options = { options: loaded.options }
    return <Loader loaded={!loaded.isFetching}>
        <Form onSubmit={props.handleSubmit}
                   className="shadow p-3 mb-5 bg-body rounded">
                <FormHeader {...options} id={loaded.id} {...props}>
                    <OrderNumber />
                </FormHeader>
                <Field name="id" hidden {...options} component={Input} />
                <Row>
                    <Field  name="customer"
                            {...options}
                            component={DropdownListFormGroup}
                            dataKey='id'
                            textField={item => CustomerName(item, loaded.customer_props)}
                            search_path={Actions.getSearchPath()}
                            label_col_size={2}
                            renderListItem={({ item }) => CustomerName(item, loaded.customer_props)}
                            renderValue={({ item }) => CustomerName(item, loaded.customer_props)}
                            />
                </Row>
                <Row>
                    <Col sm={2}>
                        <SelectFloatingFormGroup name="delivery_type"
                            dataKey='value'
                            textField='display_name'
                            {...options} />
                    </Col>
                    <Col sm={6}>
                        <Field name="address" {...options}
                            component={FloatingFormGroup}/>
                    </Col>
                </Row>
                <Table size="sm" responsive bordered hover>
                    <FieldArray name="order_items"
                        options={loaded.order_items_props}
                        common_consts={loaded.common_consts}
                        component={OrderItems}/>
                    <tfoot>
                        <tr>
                            <td/>
                            <td>
                                <Field name="total_text" disabled
                                component={Input} />
                            </td>
                            <td/>
                            <td>
                                <Field name="order_items_amount" type="number"
                                    disabled component={Input} />
                            </td>
                            <td>
                                <Field name="order_items_cost" type="number"
                                    disabled component={Input} />
                            </td>
                            <td>
                                <Field name="order_items_weight" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <Label name="samples" {...options}/>
                            </td>
                            <td/>
                            <td/>
                            <td/>
                            <td>
                                <Field name="samples_weight" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <Label name="packet" {...options}/>
                            </td>
                            <td/>
                            <td/>
                            <td>
                                <SelectFloatingFormGroup name="packet"
                                    dataKey='value'
                                    textField='display_name'
                                    {...options} />
                            </td>
                            <td>
                                <Field name="packet_weight" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <Label name="post_cost" {...options}/>
                            </td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="post_cost" type="number"
                                component={Input} {...options} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <Label name="post_cost_with_packet"
                                    {...options}/>
                            </td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="post_cost_with_packet" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <Label name="post_discount" {...options}/>
                            </td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="post_discount" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <Label name="total_postals" {...options}/>
                            </td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="total_postals"
                                    type="number" disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                <Label name="total_sum" {...options}/>
                            </td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="total_sum"
                                    type="number" disabled component={Input} />
                            </td>
                            <td>
                                <Field name="total_weight" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                    </tfoot>
                </Table>
        </Form>
        </Loader>
}

export default OrderFormRender
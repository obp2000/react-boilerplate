import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap, Row, Col, Table } from 'reactstrap'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import Loader from 'react-loader'
// import { NumberPicker } from 'react-widgets'
// import TdFormGroup from '../order_items/TdFormGroup'
import TdInput from '../Shared/TdInput'
import TdText from './TdText'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
// import SubmitButton from '../Shared/SubmitButton'
import OrderItems from '../order_items/OrderItems'
import { SamplesWeight, PostPacketWeight } from './Consts'
import CustomerField from '../customers/CustomerField'
// import PostCostButton from './PostCostButton'
import OrderNumber from './OrderNumber'
import FormHeader from '../Shared/FormHeader'
import { validate } from './Validators'
import { order_calculator } from './Selectors'
import { order_items_calculator } from '../order_items/Selectors'
import { onSubmitAction } from '../redux/ServerActions'
import { Actions } from '../redux/Orders'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'

const OrderForm = () => {
    const loaded = useSelector(({
        orders: {
            object,
        },
        auth: {
            accessToken
        },
        temp_state: {
            isFetching
        }
    }) => ({
        object,
        isFetching,
        accessToken
    }))
    const dispatch = useDispatch()
    return <Form
        name={'order'}
        validate={validate}
        onSubmit={onSubmitAction(dispatch, Actions, loaded.accessToken)}
        mutators={{
        ...arrayMutators
        }}
        decorators={[order_calculator, order_items_calculator]}
        initialValues={{...loaded.object,
                           samples_weight: SamplesWeight,
                           packet_weight: PostPacketWeight}}>
      {({ handleSubmit, submitError, ...rest }) => (
        <Loader loaded={!loaded.isFetching}>
        <FormStrap onSubmit={handleSubmit}
                   className="shadow p-3 mb-5 bg-body rounded">
                <FormHeader {...{object: loaded.object, ...rest}}>
                    <OrderNumber />
                </FormHeader>
                <Field name="id" label="Id" hidden component={Input} />
                <Row>
                        <Field name="customer" label='Заказчик'
                            component={CustomerField}/>
                </Row>
                <Row>
                    <Col sm={2}>
                        <SelectFloatingFormGroup name="delivery_type"
                            label='Доставка' dataKey='value'
                            textField='display_name'
                            options={loaded.object.delivery_types} />
                    </Col>
                    <Col sm={6}>
                        <Field name="address" label='Адрес доставки'
                            component={FloatingFormGroup}/>
                    </Col>
                </Row>
                <Table size="sm" responsive bordered hover>
                    <FieldArray name="order_items" component={OrderItems}/>
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
                            <td>Образцы</td>
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
                            <td>Почтовый пакет</td>
                            <td/>
                            <td/>
                            <td>
                                <SelectFloatingFormGroup name="packet"
                                    label='Почтовый пакет' dataKey='value'
                                    textField='display_name'
                                    options={loaded.object.packets} />
                            </td>
                            <td>
                                <Field name="packet_weight" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>Тариф Почты России</td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="post_cost" label="Тариф Почты"
                                   type="number" component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>Тариф Почты России + пакет</td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="post_cost_with_packet" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>Скидка на почтовые</td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="post_discount" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>Почтовые с учетом скидки</td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="post_cost_with_packet_and_post_discount"
                                    type="number" disabled component={Input} />
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>Итого</td>
                            <td/>
                            <td/>
                            <td>
                                <Field name="cost_with_postal_and_post_discount"
                                    type="number" disabled component={Input} />
                            </td>
                            <td>
                                <Field name="tolalWeight" type="number"
                                    disabled component={Input} />
                            </td>
                        </tr>
                    </tfoot>
                </Table>
        </FormStrap>
        </Loader>
        )}
    </Form>
}

export default OrderForm
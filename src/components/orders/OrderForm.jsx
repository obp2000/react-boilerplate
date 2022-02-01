import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap, Row, Col, Table } from 'reactstrap'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import Loader from 'react-loader'
// import TdFormGroup from '../order_items/TdFormGroup'
import TdInput from '../Shared/TdInput'
import TdText from './TdText'
// import FormGroup from './FormGroup'
import FloatingFormGroupCol from '../Shared/FloatingFormGroupCol'
// import SubmitButton from '../Shared/SubmitButton'
import OrderItems from '../order_items/OrderItems'
import { SamplesWeight, PostPacketWeight } from './Consts'
import CustomerField from '../customers/CustomerField'
import DeliveryTypeField from './DeliveryTypeField'
// import PostCostButton from './PostCostButton'
import PostPacketField from './PostPacketField'
import OrderNumber from './OrderNumber'
import FormHeader from '../Shared/FormHeader'
import { validate } from './Validators'
import { order_calculator } from './Selectors'
import { order_items_calculator } from '../order_items/Selectors'
import { onSubmitAction } from '../redux/ServerActions'
import { Actions } from '../redux/Orders'

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
                <FormHeader {...rest}>
                    <OrderNumber />
                </FormHeader>
                <Row>
                    <Field name="customer" label='Заказчик' size={6}
                           component={CustomerField}/>
                    <Field name="customer_name" label="ФИО" size={6}
                           disabled component={FloatingFormGroupCol} />
                    <Field name="pindex" label="Индекс" size={2}
                           disabled component={FloatingFormGroupCol} />
                    <Field name="city" label="Город" size={2} disabled
                           component={FloatingFormGroupCol} />
                    <Field name="customer_address" label="Адрес" size={6}
                           disabled component={FloatingFormGroupCol} />
                    <Field name="delivery_type" label='Доставка' size={5}
                        options={loaded.object.delivery_types}
                        component={DeliveryTypeField}/>
                    <Field name="address" label='Адрес доставки' size={6}
                           component={FloatingFormGroupCol}/>
                </Row>

                <Table size="sm" responsive bordered hover>
                    <FieldArray name="order_items" component={OrderItems}/>
                    <tfoot>
                        <tr>
                            <Field name="total_text" colSpan={3} disabled
                                component={TdInput} />
                            <Field name="order_items_amount" type="number"
                                disabled component={TdInput} />
                            <Field name="order_items_cost" type="number"
                                disabled component={TdInput} />
                            <Field name="order_items_weight" type="number"
                                disabled component={TdInput} />
                        </tr>
                        <tr>
                            <TdText label="Образцы" colSpan={5} />
                            <Field name="samples_weight" type="number"
                                disabled component={TdInput} />
                        </tr>
                        <tr>
                            <TdText label="Почтовый пакет" colSpan={4} />
                            <td>
                               <Field name="packet" size={8}
                                      options={loaded.object.packets}
                                      component={PostPacketField}/>
                            </td>
                            <Field name="packet_weight" type="number"
                                disabled component={TdInput} />
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                Тариф Почты России
                            </td>
                            <Field name="post_cost" label="Тариф Почты"
                                   type="number" component={TdInput} />
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                Тариф Почты России + пакет
                            </td>
                            <Field name="post_cost_with_packet" type="number"
                                disabled component={TdInput} />
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                Скидка на почтовые
                            </td>
                            <Field name="post_discount" type="number"
                                disabled component={TdInput} />
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                Почтовые с учетом скидки
                            </td>
                            <Field name="post_cost_with_packet_and_post_discount"
                                type="number" disabled component={TdInput} />
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                Итого
                            </td>
                            <Field name="cost_with_postal_and_post_discount"
                                type="number" disabled component={TdInput} />
                            <Field name="tolalWeight" type="number"
                                disabled component={TdInput} />
                        </tr>
                    </tfoot>
                </Table>
        </FormStrap>
        </Loader>
        )}
    </Form>
}

export default OrderForm
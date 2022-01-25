import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import { Form as FormStrap, Row, Col, Card, CardBody, CardTitle, CardImg, Table } from 'reactstrap'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import Loader from 'react-loader'
// import TdFormGroup from '../order_items/TdFormGroup'
import TdInput from '../Shared/TdInput'
import TdText from './TdText'
// import FormGroup from './FormGroup'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/Containers/BackButton'
import OrderItems from '../order_items/OrderItems'
import { SamplesWeight, PostPacketWeight } from './Consts'
import CustomerField from '../customers/Containers/CustomerField'
import DeliveryTypeField from './Containers/DeliveryTypeField'
import PostCostButton from './Containers/PostCostButton'
import PostPacketField from './PostPacketField'
import OrderNumber from './Containers/OrderNumber'
import Errors from '../Errors'

import { validate } from './Validators'
import { order_calculator } from './Selectors'
import { order_items_calculator } from '../order_items/Selectors'

const OrderForm = ({
    onSubmit,
    initialValues,
    isFetching,
    errors
}) => <Loader loaded={!isFetching}>

    <Form
        name={'order'}
        validate={validate}
        onSubmit={onSubmit}
        mutators={{
        // potentially other mutators could be merged here
        ...arrayMutators
        }}
        decorators={[order_calculator, order_items_calculator]}
        // enableReinitialize={true}
        initialValues={{...initialValues, samples_weight: SamplesWeight, packet_weight: PostPacketWeight}}>
      {({ handleSubmit, submitting, invalid, pristine, touched, submitError }) => (
        <FormStrap onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
            {errors && <Errors errors={errors}/>}
                <div className='row'>
                    <div className="col-sm-6">
                        <h4>Заказ&nbsp;
                            <OrderNumber />
                        </h4>
                    </div>
                    <div className="col-sm-6 text-right">
                        <BackButton />
                        &nbsp;
                        <SubmitButton submitDisabled={submitting || invalid || pristine}/>
                    </div>
                </div>
                <Row>
                    <Field name="customer" label='Заказчик' size={6} component={CustomerField}/>
                    <Field name="customer_name" label="ФИО" size={6} disabled component={FloatingFormGroup} />
                    <Field name="pindex" label="Индекс" size={2} disabled component={FloatingFormGroup} />
                    <Field name="city" label="Город" size={2} disabled component={FloatingFormGroup} />
                    <Field name="customer_address" label="Адрес" size={6} disabled component={FloatingFormGroup} />
                    <Field name="delivery_type" label='Доставка' size={5} component={DeliveryTypeField}/>
                    <Field name="address" label='Адрес доставки' size={6} component={FloatingFormGroup}/>
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
                               <Field name="packet" size={7} component={PostPacketField}/>
                            </td>
                            <Field name="packet_weight" type="number"
                                disabled component={TdInput} />
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                Тариф Почты России
                            </td>
                            <Field name="post_cost" label="Тариф Почты" type="number"
                                    component={TdInput} />
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
        )}
    </Form>
</Loader>

OrderForm.propTypes = {
    onSubmit: PropTypes.func,
    isFetching: PropTypes.bool,
    errors: PropTypes.array
}

export default OrderForm
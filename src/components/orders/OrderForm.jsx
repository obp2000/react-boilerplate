import PropTypes from 'prop-types'
import React from 'react'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { Table } from 'reactstrap'
import Loader from 'react-loader'
import renderField from '../Shared/RenderField'
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
}) => <Form
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
        <form onSubmit={handleSubmit} className="form-horizontal">
            {errors && <Errors errors={errors}/>}
                <br/>
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
                <div>
                    <div className="form-row">
                        <label className="col-sm-1 col-form-label font-weight-bold">Заказчик:</label>
                        <div className="col-sm-7">
                            <CustomerField />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-sm-1">
                            ФИО:
                        </div>
                        <div className="col-sm-5">
                            <Field name="customer_name" component={renderField} readOnly/>
                        </div>
                    </div>
                    <div className="form-row">
                        <label className="col-sm-1">
                            Адрес:
                        </label>
                        <div className="col-sm-9">
                            <Field name="pindex" component={renderField} readOnly/>
                            <Field name="city" component={renderField} readOnly/>
                            <Field name="customer_address"
                                component={renderField} readOnly/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="form-row">
                        <label className="col-sm-1 col-form-label">
                            Доставка:
                        </label>
                        <div className="col-sm-2">
                            <DeliveryTypeField />
                        </div>
                        <div className="col-sm-6">
                            <Field name="address" component={renderField}
                                placeholder="Адрес доставки"/>
                        </div>
                    </div>
                </div>
                <Table size="sm" responsive bordered hover>
                    <FieldArray name="order_items" component={OrderItems}/>
                    <tfoot className="thead-light">
                        <tr className="d-flex">
                            <td scope="col" className="col-1"></td>
                            <td scope="col" className="col-6">
                                <Field name="total_text"
                                    component={renderField} readOnly/>
                            </td>
                            <td scope="col" className="col-1"></td>
                            <td scope="col" className="col-1 text-right">
                                <Field name="order_items_amount" type="number"
                                    component={renderField} readOnly />
                            </td>
                            <td scope="col" className="col-1 text-right">
                                <strong>
                                    <Field name="order_items_cost" type="number"
                                        component={renderField} readOnly />
                                </strong>
                            </td>
                            <td scope="col" className="col-1 text-right">
                                <Field name="order_items_weight" type="number"
                                    component={renderField} readOnly />
                            </td>
                            <td scope="col" className="col-1"></td>
                        </tr>
                    </tfoot>
                </Table>
                <Table size="sm" responsive bordered hover>
                        <tbody>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Образцы
                                </td>
                                <td className="col-sm-1 text-right"></td>
                                <td className="col-sm-1 text-right">
                                    <Field name="samples_weight" type="number"
                                        component={renderField} readOnly />
                                </td>
                            </tr>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Почтовый пакет
                                </td>
                                <td className="col-sm-1 text-right">
                                   <PostPacketField />
                                </td>
                                <td className="col-sm-1 text-right">
                                    <Field name="packet_weight" type="number"
                                        component={renderField} readOnly />
                                </td>
                            </tr>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Тариф Почты России&nbsp;
                                </td>
                                <td className="col-sm-1 text-right">
                                    <Field name='post_cost' type="number"
                                        component={renderField} placeholder="Тариф Почты"
                                                 // parse={(value) => value.replace('ddd', '')}
                                                 // format={(value) => (value + 'ddd')}
                                                 />
                                </td>
                                <td className="col-sm-1 text-right"></td>
                            </tr>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Тариф Почты России + пакет
                                </td>
                                <td className="col-sm-1 text-right">
                                    <Field name="post_cost_with_packet" type="number"
                                        component={renderField} readOnly />
                                </td>
                                <td className="col-sm-1 text-right">
                                </td>
                            </tr>
                            {true && <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Скидка на почтовые
                                </td>
                                <td className="col-sm-1 text-right">
                                    <Field name="post_discount" type="number"
                                        component={renderField} readOnly />
                                </td>
                                <td className="col-sm-1"></td>
                            </tr>}
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Почтовые {true && 'с учетом скидки'}
                                </td>
                                <td className="col-sm-1 text-right">
                                    <strong>
                                    <Field name="post_cost_with_packet_and_post_discount"
                                        type="number" component={renderField} readOnly />
                                    </strong>
                                </td>
                                <td className="col-sm-1 text-right">
                                </td>
                            </tr>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    <strong>Итого</strong>
                                </td>
                                <td className="col-sm-1 text-right">
                                    <strong>
                                    <Field name="cost_with_postal_and_post_discount"
                                        type="number" component={renderField} readOnly />
                                    </strong>
                                </td>
                                <td className="col-sm-1 text-right">
                                    <strong>
                                        <Field name="tolalWeight" type="number"
                                            component={renderField} readOnly />
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                </Table>
                <hr/>
        </form>
        )}
    </Form>


OrderForm.propTypes = {
    onSubmit: PropTypes.func,
    isFetching: PropTypes.bool,
    errors: PropTypes.array
}

export default OrderForm
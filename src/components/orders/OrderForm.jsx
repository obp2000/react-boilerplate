import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { Badge, Table } from 'reactstrap'
import Loader from 'react-loader'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/Containers/BackButton'
// import CustomerCombobox from '../customers/Containers/CustomerCombobox'
import TextField from '../Shared/TextField'
import NumberField from '../Shared/NumberField'
import IntegerField from '../Shared/IntegerField'
import OrderItems from '../order_items/OrderItems'
import { SamplesWeight } from '../samples/Consts'
import Gift from '../gifts/Gift'
import { PacketWeight } from '../post_packets/Consts'
import CustomerField from '../customers/Containers/CustomerField'
import DeliveryTypeField from './Containers/DeliveryTypeField'
import PostCostButton from './Containers/PostCostButton'
import PostPacketField from '../post_packets/PostPacketField'

import { validate } from './Validators'
import { order_calculator } from './Selectors'
import { order_items_calculator } from '../order_items/Selectors'

const OrderForm = ({
    onSubmit,
    initialValues,
    isFetching,

    id,
    pindex,
    tolalWeight,
    created_at,
    // accessToken,
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
        initialValues={initialValues}>
      {({ handleSubmit, submitting, invalid, pristine, touched }) => (
        <form onSubmit={handleSubmit} className="form-horizontal">
                <br/>
                <div className='row'>
                    <div className="col-sm-6">
                        <h4>Заказ&nbsp;
                            <Badge color="primary">
                                № {id || ' Новый' } от {created_at}
                            </Badge>
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
                            <TextField name="customer_name" readOnly/>
                        </div>
                    </div>
                    <div className="form-row">
                        <label className="col-sm-1">
                            Адрес:
                        </label>
                        <div className="col-sm-9">
                            <TextField name="pindex" readOnly/>
                            <TextField name="city" readOnly/>
                            <TextField name="customer_address" readOnly/>
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
                            <TextField name="address" label="Адрес доставки"/>
                        </div>
                    </div>
                </div>
                <Table size="sm" responsive bordered hover>
                    <FieldArray name="order_items" component={OrderItems}/>
                    <tfoot className="thead-light">
                        <tr className="d-flex">
                            <td scope="col" className="col-1"></td>
                            <td scope="col" className="col-6">
                                <TextField name="total_text" readOnly/>
                            </td>
                            <td scope="col" className="col-1"></td>
                            <td scope="col" className="col-1 text-right">
                                <IntegerField name="order_items_amount" readOnly />
                            </td>
                            <td scope="col" className="col-1 text-right">
                                <strong>
                                    <IntegerField name="order_items_cost" readOnly />
                                </strong>
                            </td>
                            <td scope="col" className="col-1 text-right">
                                <IntegerField name="order_items_weight" readOnly />
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
                                    {SamplesWeight}
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
                                    {PacketWeight}
                                </td>
                            </tr>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Тариф Почты России&nbsp;
                                    <PostCostButton pindex={pindex} tolalWeight={tolalWeight} />
                                </td>
                                <td className="col-sm-1 text-right">
                                    <NumberField name='post_cost'
                                                 label="Тариф Почты"
                                                 parse={(value) => parseInt(value || 0)}
                                                 // format={(value) => parseInt(value || 0)}
                                                 />
                                </td>
                                <td className="col-sm-1 text-right"></td>
                            </tr>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Тариф Почты России + пакет
                                </td>
                                <td className="col-sm-1 text-right">
                                    <NumberField name="post_cost_with_packet" readOnly />
                                </td>
                                <td className="col-sm-1 text-right">
                                </td>
                            </tr>
                            {true && <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Скидка на почтовые
                                </td>
                                <td className="col-sm-1 text-right">
                                    <NumberField name="post_discount" readOnly />
                                </td>
                                <td className="col-sm-1"></td>
                            </tr>}
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Почтовые {true && 'с учетом скидки'}
                                </td>
                                <td className="col-sm-1 text-right">
                                    <strong>
                                    <NumberField name="post_cost_with_packet_and_post_discount" readOnly />
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
                                    <NumberField name="cost_with_postal_and_post_discount" readOnly />
                                    </strong>
                                </td>
                                <td className="col-sm-1 text-right">
                                    <strong>
                                        <NumberField name="tolalWeight" readOnly />
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
    id: PropTypes.string,
    pindex: PropTypes.string,
    // accessToken: PropTypes.string,
    // delivery_types: PropTypes.object,
 }

export default OrderForm
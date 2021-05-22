import PropTypes from 'prop-types'
import React from 'react'
import {
    FieldArray,
    Field
} from 'redux-form'
import {
    Form,
    Badge,
    Table,
    Button
} from 'reactstrap'
import Loader from 'react-loader'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/BackButton'
// import CustomerCombobox from '../customers/Containers/CustomerCombobox'
import TextField from '../Shared/TextField'
// import DeliveryTypesCombobox from '../delivery_types/Containers/DeliveryTypesCombobox'
// import DeliveryTypesSelect from '../delivery_types/Containers/DeliveryTypesSelect'
import OrderItems from '../order_items/OrderItems'

import NumberField from '../Shared/NumberField'
import {
    SamplesWeight
} from '../samples/Consts'

// import GetPostCostButton from '../post_cost/GetPostCostButton'
import Gift from '../gifts/Gift'
// import PacketSelect from '../post_packets/PacketSelect'
import {
    Packets,
    PacketWeight
} from '../post_packets/Consts'
import dropdownListComponent from '../renderDropdownList'

const OrderForm = ({
    submitting,
    invalid,
    pristine,
    handleSubmit,
    onSubmit,
    isFetching,
    pindex,
    city,
    address,
    name,
    post_cost_with_packet,
    post_discount,
    hasPostDiscount,
    post_cost_with_packet_and_post_discount,
    cost_with_postal_and_post_discount,
    needGift,
    tolalWeight,
    // accessToken,
    goBack,
    getPostCost,
    onSearchCustomer,
    customers,
    delivery_types,
    // initialValues: {id},
    id,
    created_at,
    count,
    amount,
    cost,
    weight
}) => <Form onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                <br/>
                <div className='row'>
                    <div className="col-sm-6">
                        <h4>Заказ&nbsp;
                            <Badge color="primary">
                                № {id || ' Новый'} от {created_at}
                            </Badge>
                        </h4>
                    </div>
                    <div className="col-sm-6 text-right">
                        <BackButton goBack={goBack}/>
                        &nbsp;
                        <SubmitButton submitDisabled={submitting || invalid || pristine}/>
                    </div>
                </div>
                <div>
                    <div className="form-row">
                        <label className="col-sm-1 col-form-label">Заказчик:</label>
                        <div className="col-sm-7">
                            <Field name='customer' 
                                   component={dropdownListComponent} 
                                   data={customers.search_customers}
                                   textField='nick' 
                                   valueField='id' 
                                   isFetching={customers.isFetching} 
                                   onSearch={onSearchCustomer}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-sm-1">
                            ФИО:
                        </div>
                        <div className="col-sm-5">
                            {name}
                        </div>
                    </div>
                    <div className="form-row">
                        <label className="col-sm-1">
                            Адрес:
                        </label>
                        <div className="col-sm-9">
                            {pindex} {city} {address}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="form-row">
                        <label className="col-sm-1 col-form-label">
                            Доставка:
                        </label>
                        <div className="col-sm-2">
                            <Field name='delivery_type' 
                                   component='select'>
                                <option value="" />
                                {delivery_types.results.map((delivery_type, index) => 
                                    <option key={index} value={delivery_type.value}>
                                        {delivery_type.label}
                                    </option>)
                                }
                            </Field>
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
                            <td scope="col" className="col-1">{count}</td>
                            <td scope="col" className="col-6">Итого</td>
                            <td scope="col" className="col-1"></td>
                            <td scope="col" className="col-1 text-right">{amount.toFixed(2)}</td>
                            <td scope="col" className="col-1 text-right"><strong>{cost.toFixed(2)}</strong></td>
                            <td scope="col" className="col-1 text-right">{weight.toFixed(0)}</td>
                            <td scope="col" className="col-1"></td>
                        </tr>
                    </tfoot>        
                </Table>
                <Table size="sm" responsive bordered hover>
                        <tbody>
                            {needGift && <Gift/>}
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
                                    <Field name="packet"
                                           component={dropdownListComponent}
                                           data={Packets} 
                                           defaultValue={0}
                                           // parse={(value) => parseInt(value || 0)}                
                                    />
                                </td>
                                <td className="col-sm-1 text-right">
                                    {PacketWeight}
                                </td>
                            </tr>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Тариф Почты России&nbsp;
                                    <Button onClick={() => getPostCost(pindex, tolalWeight)}
                                            type="button"
                                            color="primary"
                                            outline
                                            size="sm"
                                            disabled={!pindex || !tolalWeight}>Рассчитать</Button>
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
                                    {post_cost_with_packet.toFixed(2)}
                                </td>
                                <td className="col-sm-1 text-right">
                                </td>
                            </tr>
                            {hasPostDiscount && <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Скидка на почтовые
                                </td>
                                <td className="col-sm-1 text-right">
                                    -{post_discount.toFixed(2)}
                                </td>
                                <td className="col-sm-1"></td>
                            </tr>}
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    Почтовые {hasPostDiscount && 'с учетом скидки'}
                                </td>
                                <td className="col-sm-1 text-right">
                                    <strong>{post_cost_with_packet_and_post_discount.toFixed(2)}</strong>
                                </td>
                                <td className="col-sm-1 text-right">
                                </td>
                            </tr>
                            <tr className='d-flex'>
                                <td className="col-sm-9">
                                    <strong>Итого</strong>
                                </td>
                                <td className="col-sm-1 text-right">
                                    <strong>{cost_with_postal_and_post_discount.toFixed(2)}</strong>
                                </td>
                                <td className="col-sm-1 text-right">
                                    <strong>{tolalWeight.toFixed(0)}</strong>
                                </td>
                            </tr>
                        </tbody>
                </Table>
                <hr/>
            </Form>


OrderForm.propTypes = {
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    isFetching: PropTypes.bool,
    id: PropTypes.string,
    created_at: PropTypes.string,
    pindex: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    // PacketWeight: PropTypes.number,
    post_cost_with_packet: PropTypes.number,
    post_discount: PropTypes.number,
    hasPostDiscount: PropTypes.bool,
    needGift: PropTypes.bool,
    post_cost_with_packet_and_post_discount: PropTypes.number,
    cost_with_postal_and_post_discount: PropTypes.number,
    // accessToken: PropTypes.string,
    getPostCost: PropTypes.func.isRequired,
    onSearchCustomer: PropTypes.func.isRequired,
    customers: PropTypes.object,
    delivery_types: PropTypes.object,
    count: PropTypes.number,
    amount: PropTypes.number,
    cost: PropTypes.number,
    weight: PropTypes.number
}

OrderForm.defaultProps = {
    created_at: '',
    address: '',
    post_cost_with_packet: 0,
    post_discount: 0,
    hasPostDiscount: false,
    needGift: false,
    post_cost_with_packet_and_post_discount: 0,
    cost_with_postal_and_post_discount: 0,
    count: 0,
    amount: 0,
    cost: 0,
    weight: 0
}

export default OrderForm
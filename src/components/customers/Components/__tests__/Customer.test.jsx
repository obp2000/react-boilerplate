import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
// import {ConnectedRouter} from 'connected-react-router'
// import * as redux from 'react-redux'
import configureStore, {history} from '../../../Store'
import FetchCustomer from '../../Actions/FetchCustomer'
import Customer from '../Customer'
import * as ReduxCustomers from '../../../redux/Customers'
import "babel-polyfill"
jest.mock('../../../loading_spinner.gif', () => 'loading_spinner.gif')

Enzyme.configure({adapter: new Adapter()})

function setup() {

    const store = configureStore()

    const props = {
        store,
        match: {
            params: {
                id: '2'
            }
        }
    }

    const CustomerWrapper = mount(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <FetchCustomer {...props}/>
            </ConnectedRouter>
        </Provider>
    )
    return {props, CustomerWrapper}
}

describe('action', () => {
    describe('Customer', () => {
        test('should render Customer component', () => {
            const {props, CustomerWrapper} = setup()
            const customer = CustomerWrapper.find(Customer)
            expect(customer.length).toBe(1)
        })
        test('should have props', () => {
            const {props, CustomerWrapper} = setup()
            const customer = CustomerWrapper.find(Customer)
            expect(customer.props().fetchCustomer).toBeInstanceOf(Function)
        })
        test('should fetch customer after mount', async () => {
            // const connect = jest.spyOn(redux, 'connect')
            const fetchCustomerIfNeeded = jest.spyOn(ReduxCustomers, 'fetchCustomerIfNeeded')
            const {props, CustomerWrapper} = await setup()
            // expect(connect).toHaveBeenCalledTimes(1)
            expect(fetchCustomerIfNeeded).toHaveBeenCalledTimes(1)
            expect(fetchCustomerIfNeeded).toHaveBeenCalledWith(props.match.params.id)
        })
    })
})

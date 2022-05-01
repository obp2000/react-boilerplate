import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
// import {ConnectedRouter} from 'connected-react-router'
import configureStore, {history} from '../../../Store'
import FetchCustomers from '../../Actions/FetchCustomers'
import Customers from '../Customers'
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
                page: '2',
		term: ''
            }
        }
    }

    const CustomersWrapper = mount(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <FetchCustomers {...props}/>
            </ConnectedRouter>
        </Provider>
    )
    return {props, CustomersWrapper}
}

describe('action', () => {
    describe('Customers', () => {
        test('should render Customers component', async () => {
            const {props, CustomersWrapper} = await setup()
            const customers = CustomersWrapper.find(Customers)
            expect(customers.length).toBe(1)
        })
        test('should have props', async () => {
            const {props, CustomersWrapper} = await setup()
            const customers = CustomersWrapper.find(Customers)
            expect(customers.props().fetchCustomers).toBeInstanceOf(Function)
        })
        test('should fetch customers after mount', async () => {
            const fetchCustomersIfNeeded = jest.spyOn(ReduxCustomers, 'fetchCustomersIfNeeded')
            const {props, CustomersWrapper} = await setup()
            expect(fetchCustomersIfNeeded).toHaveBeenCalledTimes(1)
            expect(fetchCustomersIfNeeded).toHaveBeenCalledWith(props.match.params.page, props.match.params.term)
        })
    })
})

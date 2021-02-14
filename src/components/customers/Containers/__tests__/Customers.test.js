import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Customers from '../Customers'
import CustomersTable from '../../Customers'
import "babel-polyfill"
jest.mock('../../../loading_spinner.gif', () => 'loading_spinner.gif')

Enzyme.configure({adapter: new Adapter()})

function setup() {

    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
        customers: {
            customers: ['customer1'],
            isFetching: true,
            totalCount: 3
        }
    })

    const props = {
        store
    }

    const customers = shallow(<Customers {...props}/>)
    return {props, customers}
}

describe('container', () => {
    describe('Customers', () => {
        test('should have props', async () => {
            const {props, customers} = await setup()
            const customersTable = customers.find(CustomersTable)
            expect(customersTable.props().customers).toBe(props.store.getState().customers.customers)
            expect(customersTable.props().totalCount).toBe(props.store.getState().customers.totalCount)
            expect(customersTable.props().isFetching).toBe(props.store.getState().customers.isFetching)
        })
    })
})

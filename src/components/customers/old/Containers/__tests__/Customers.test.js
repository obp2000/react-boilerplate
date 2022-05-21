import React from 'react'
import {shallow, mount} from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
import configureStore, {history} from '../../../Store'
import Customers from '../Customers'
import ObjectsTable from '../../../Shared/ObjectsTable'
import {Actions} from '../../../redux/Customers'
import {getObjectsAction, deleteObjectAction} from '../../../redux/ServerActions'
import TableData from '../../TableData'
// import "babel-polyfill"
jest.mock('../../../loading_spinner.gif', () => 'loading_spinner.gif')
// import '@testing-library/jest-dom'

function setup() {
  // const middlewares = [thunk]
  // const mockStore = configureMockStore(middlewares)
  // const store = mockStore({
  //     customers: {
  //         results: ['customer1', 'customer2', 'customer3'],
  //         totalCount: 3
  //     },
  //     temp_state: {
  //         isFetching: true,
  //     }
  // })
  const store = configureStore()

  const props = {
    store,
    TableData,
    deleteObjectAction: deleteObjectAction(Actions),
  }

  // const customers = shallow(<Customers {...props}/>)
  const customers = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Customers />
        </ConnectedRouter>
      </Provider>,
  )
  return {props, customers}
}

describe('container', () => {
  describe('Customers', () => {
    test('should have props', async () => {
      const {props, customers} = await setup()
      const objectsTable = customers.find(ObjectsTable)
      console.log('props ', objectsTable.props())
      expect(objectsTable.props().TableData).toBe(TableData)
      // expect(objectsTable.props().deleteObjectAction).toBe(props.deleteObjectAction)

      // expect(customersTable.props().customers).toBe(props.store.getState().customers.customers)
      // expect(customersTable.props().totalCount).toBe(props.store.getState().customers.totalCount)
      // expect(customersTable.props().isFetching).toBe(props.store.getState().customers.isFetching)
    })
  })
})

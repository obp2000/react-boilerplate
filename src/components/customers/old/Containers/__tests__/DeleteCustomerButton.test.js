import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from '../../../Store'
import DeleteButton from '../../../Shared/DeleteButton'
import DeleteCustomerButton from '../DeleteCustomerButton'
import * as ReduxCustomers from '../../../redux/Customers'
import * as ConfirmActionFunc from '../../../Shared/ConfirmAction'
import 'babel-polyfill'

Enzyme.configure({adapter: new Adapter()})

function setup() {
  const store = configureStore()

  const props = {
    store,
    id: 1,
  }

  const deleteCustomerButton = shallow(<DeleteCustomerButton {...props}/>)
  return {props, deleteCustomerButton}
}

describe('components', () => {
  describe('DeleteCustomerButton', () => {
    test('should have handleDelete prop', () => {
      const ConfirmAction = jest.spyOn(ConfirmActionFunc, 'default')
      const {deleteCustomerButton, props} = setup()
      expect(ConfirmAction).toHaveBeenCalledTimes(1)
      expect(ConfirmAction.mock.results[0].value).toBeInstanceOf(Function)
      expect(deleteCustomerButton.props().handleDelete).toBe(ConfirmAction.mock.results[0].value)
    })
    test('should render delete button', () => {
      const {deleteCustomerButton, props} = setup()
      const deleteButton = deleteCustomerButton.find(DeleteButton)
      const button = deleteButton
          .shallow()
          .find('button')
      expect(button.length).toBe(1)
      expect(button.text()).toBe('Удалить')
    })
    test('should call confirm dialogue on click', () => {
      const {deleteCustomerButton, props} = setup()
      const deleteButton = deleteCustomerButton.find(DeleteButton)
      const button = deleteButton
          .shallow()
          .find('button')
      const confirm = jest
          .spyOn(global, 'confirm')
          .mockImplementation(() => true)
      button.simulate('click', {
        preventDefault: () => null,
      })
      expect(confirm).toHaveBeenCalledTimes(1)
    })
    test('should dispatch deleteCustomer redux action on click', async () => {
      const {deleteCustomerButton, props} = setup()
      const deleteButton = deleteCustomerButton.find(DeleteButton)
      const button = deleteButton
          .shallow()
          .find('button')
      const deleteCustomer = jest.spyOn(ReduxCustomers, 'deleteCustomer')
      button.simulate(await 'click', {
        preventDefault: () => null,
      })
      expect(deleteCustomer).toHaveBeenCalledTimes(1)
      expect(deleteCustomer).toHaveBeenCalledWith(props.id)
    })
  })
})

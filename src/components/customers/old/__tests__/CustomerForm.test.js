import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import customers from '../../redux/Customers'
import CustomerFormContainer from '../Containers/NewCustomer'
// import CustomerFormContainer from '../Actions/FetchCustomer'
import CityCombobox from '../Containers/CityCombobox'
import * as ReduxCustomers from '../../redux/Customers'
import 'babel-polyfill'

jest.mock('../../loading_spinner.gif', () => 'loading_spinner.gif')

Enzyme.configure({adapter: new Adapter()})

function setup() {
  const store = createStore(combineReducers({form: formReducer, customers}))

  const wrapper = mount(
      <Provider store={store}>
        <CustomerFormContainer/>
      </Provider>,
  )
  return {wrapper}
}

describe('component', () => {
  describe('customerForm', () => {
    test('should have props', () => {
      const {wrapper} = setup()
      const customerForm = wrapper.children().find('CustomerForm')
      expect(customerForm.length).toBe(1)
      expect(customerForm.props().handleSubmit).toBeInstanceOf(Function)
      expect(customerForm.props().onSubmit).toBeInstanceOf(Function)
      expect(customerForm.props().submitting).toBe(false)
      expect(customerForm.props().invalid).toBe(true)
      expect(customerForm.props().pristine).toBe(true)
    })
    test('should have form with controls', async () => {
      const {wrapper} = await setup()
	    const form = wrapper.find('form')
      expect(form.length).toBe(1)
      expect(form.props().onSubmit).toBeInstanceOf(Function)
      const title = form.find('h4')
      expect(title.length).toBe(1)
      expect(title.text()).toBe('Покупатель')
      const backButton = form.find('BackButton')
      expect(backButton.length).toBe(1)
      const id = form.find('input[name="id"][readOnly]')
      expect(id.length).toBe(1)
      const nick = form.find('input[name="nick"]')
      expect(nick.length).toBe(1)
      const name = form.find('input[name="name"]')
      expect(name.length).toBe(1)
      const city = form.find(CityCombobox)
      expect(city.length).toBe(1)
      const pindex = form.find('input[name="pindex"]')
      expect(pindex.length).toBe(1)
      const address = form.find('input[name="address"]')
      expect(address.length).toBe(1)
      const submitButton = form.find('button[type="submit"]')
      expect(submitButton.length).toBe(1)
    })
    test('pristine form should have disabled submit button', async () => {
      const {wrapper} = await setup()
      const submitButton = wrapper.find('button[type="submit"][disabled]')
      expect(submitButton.length).toBe(1)
    })
    test('init form should not submit values', async () => {
      const updateCustomer = jest
          .spyOn(ReduxCustomers, 'updateCustomer')
          .mockImplementation(() => ({type: 'test'}))
      const {wrapper} = await setup()
      const form = wrapper.find('form')
      form.simulate(await 'submit')
      expect(updateCustomer)
          .not
          .toBeCalled()
    })
    test('render error text when nick field is blank', async () => {
      const {wrapper} = await setup()
      const nick = wrapper.find('input[name="nick"]')
      nick.simulate(await 'blur')
      const error = wrapper.find('small')
      expect(error.length).toBe(1)
      expect(error.text()).toBe('Не может быть пустым!')
    })
    test('valid form should submit values and dispatch action update customer', async () => {
      const updateCustomer = jest
          .spyOn(ReduxCustomers, 'updateCustomer')
          .mockImplementation(() => ({type: 'test'}))
      const values = {
        name: 'test name',
        nick: 'test nick',
      }
      const {wrapper} = await setup()
      const nick = wrapper.find('input[name="nick"]')
      nick.simulate(await 'change', {
        target: {
          value: values.nick,
        },
      })
      const name = wrapper.find('input[name="name"]')
      name.simulate(await 'change', {
        target: {
          value: values.name,
        },
      })
      const customerForm = wrapper.children().find('CustomerForm')
      expect(customerForm.props().valid).toBe(true)
      const form = customerForm.find('form')
      form.simulate(await 'submit')
      expect(updateCustomer).toBeCalledTimes(1)
      expect(updateCustomer).toBeCalledWith(values)
    })
  })
})

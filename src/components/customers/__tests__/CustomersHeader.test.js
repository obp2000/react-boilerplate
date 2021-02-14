import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CustomersHeader from '../CustomersHeader'
import {Link} from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  // const props = {
  //   addTodo: jest.fn()
  // }

  const enzymeWrapper = shallow(<CustomersHeader/>)

  return {
    enzymeWrapper
  }
}

describe('components', () => {
  describe('CustomersHeader', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('thead').hasClass('thead-light')).toBe(true)
      expect(enzymeWrapper.find('thead > tr').length).toBe(1)
      expect(enzymeWrapper.find('th').first().text()).toBe('Id')
      expect(enzymeWrapper.find('th').length).toBe(7)

      const linkToNew = enzymeWrapper.find(Link)
      expect(linkToNew.length).toBe(1)
      expect(linkToNew.props().to).toBe('/customers/new')
      expect(linkToNew.props().children).toBe('Новый')
    })

  })
})

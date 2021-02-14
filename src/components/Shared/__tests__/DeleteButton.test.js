import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DeleteButton from '../DeleteButton'

Enzyme.configure({ adapter: new Adapter() })

function setup() {

  const handleDelete = jest.fn(() => true)
  const props = {
    handleDelete
  }
  const enzymeWrapper = shallow(<DeleteButton {...props}/>)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('DeleteButton', () => {
    it('should render button', () => {
      const { enzymeWrapper, props } = setup()
      const Button = enzymeWrapper.find('button')

      expect(Button.length).toBe(1)
      expect(Button.hasClass('btn btn-outline-primary btn-sm')).toBe(true)
      expect(Button.props().children).toBe('Удалить')
      expect(Button.props().onClick).toBeDefined()
      expect(Button.props().onClick).toEqual(props.handleDelete)
    })

    it('should envoke handleDelete on click', () => {
      const { enzymeWrapper, props } = setup()
      const Button = enzymeWrapper.find('button')
      Button.simulate('click')
      expect(props.handleDelete).toHaveBeenCalledTimes(1)
    })

  })
})
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import Customer from '../Customer';
import DeleteCustomerButton from '../Containers/DeleteCustomerButton';
import 'babel-polyfill';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    id: 1,
    nick: 'test nick',
    name: 'test name',
    created_at: '11.11.11',
    updated_at: '11.11.11',
  };

  const enzymeWrapper = shallow(<Customer {...props}/>);

  return { enzymeWrapper, props };
}

describe('components', () => {
  describe('Customer', () => {
    test('should render self and subcomponents', async () => {
      const { enzymeWrapper, props } = await setup();

      const tds = enzymeWrapper.find('tr > td');
      expect(tds.length).toBe(7);
      expect(tds.map((td) => td.text())).toEqual(expect.arrayContaining([
        props
          .id
          .toString(),
        props.nick,
        props.name,
        props.created_at,
        props.updated_at,
      ]));
      const linkToEdit = enzymeWrapper.find(Link);
      expect(linkToEdit.length).toBe(1);
      expect(linkToEdit.props().to).toBe(`/customers/${props.id}`);
      expect(linkToEdit.props().children).toBe('Редактировать');
      const deleteCustomerButton = enzymeWrapper.find(DeleteCustomerButton);
      expect(deleteCustomerButton.length).toBe(1);
      expect(deleteCustomerButton.props().id).toBe(props.id);
    });
  });
});

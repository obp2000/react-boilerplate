import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from '../../../Store';
import FetchCustomers from '../FetchCustomers';
import 'babel-polyfill';

jest.mock('../../../loading_spinner.gif', () => 'loading_spinner.gif');

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const store = configureStore();

  const props = {
    store,
    match: {
      params: {
        page: '2',
      },
    },
  };

  const fetchCustomers = shallow(<FetchCustomers {...props}/>);
  return { props, fetchCustomers };
}

describe('action', () => {
  describe('FetchCustomers', () => {
    test('should have props', async () => {
      const { props, fetchCustomers } = await setup();
	    // console.log("props:", fetchCustomers.props())
      expect(fetchCustomers.props().children.props.fetchCustomers).toBeInstanceOf(Function);
    });
  });
});

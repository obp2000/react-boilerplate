import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Field } from 'redux-form';
import * as ReduxForm from 'redux-form';
import configureStore from '../../../Store';
import CityCombobox from '../CityCombobox';
import component from '../../../renderCombobox';
// import Combobox from 'react-widgets/lib/Combobox'
import * as ReduxCustomers from '../../../redux/Customers';
import * as ChangeActionFunc from '../../../Shared/ChangeAction';
import * as SelectActionFunc from '../../../Shared/SelectAction';
import 'babel-polyfill';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const store = configureStore({
    customers: {
      search_cities: ['city1'],
    },
  });

  const props = {
    store,
  };

  const cityCombobox = shallow(<CityCombobox {...props}/>);
  return { props, cityCombobox };
}

describe('components', () => {
  describe('CityCombobox', () => {
    test('should have props', () => {
      const ChangeAction = jest.spyOn(ChangeActionFunc, 'default');
      const SelectAction = jest.spyOn(SelectActionFunc, 'default');
      const { props, cityCombobox } = setup();
      expect(cityCombobox.props().children.props.name).toBe('city');
      expect(cityCombobox.props().children.props.textField).toBe('city');
      expect(cityCombobox.props().children.props.component).toBe(component);
      expect(cityCombobox.props().children.props.data).toEqual(props.store.getState().customers.search_cities);
      expect(cityCombobox.props().children.props.onChange).toBeInstanceOf(Function);
      expect(cityCombobox.props().children.props.onSelect).toBeInstanceOf(Function);
      expect(ChangeAction).toHaveBeenCalledTimes(1);
      expect(ChangeAction.mock.results[0].value).toBeInstanceOf(Function);
      expect(cityCombobox.props().children.props.onChange).toBe(ChangeAction.mock.results[0].value);
      expect(SelectAction).toHaveBeenCalledTimes(1);
      expect(SelectAction.mock.results[0].value).toBeInstanceOf(Function);
      expect(cityCombobox.props().children.props.onSelect).toBe(SelectAction.mock.results[0].value);
    });
    test('should render Field component', () => {
      const { props, cityCombobox } = setup();
      const field = cityCombobox.find(Field);
      expect(field.length).toBe(1);
    });
    test('should search cities redux action on input change', () => {
      const { props, cityCombobox } = setup();
      const field = cityCombobox.find(Field);
      const searchCities = jest.spyOn(ReduxCustomers, 'searchCities');
      const test_input = 't';
      field.simulate('change', {}, test_input);
      expect(searchCities).toHaveBeenCalledTimes(1);
      expect(searchCities).toHaveBeenCalledWith(test_input);
    });
    test('should change customer pindex text field value on select city', async () => {
      const { props, cityCombobox } = setup();
      const field = cityCombobox.find(Field);
      const change = jest.spyOn(ReduxForm, 'change');
      const test_city = {
        city: 'Moscow',
        pindex: '101000',
      };
      field.simulate(await 'select', test_city);
      expect(change).toHaveBeenCalledTimes(1);
      expect(change).toHaveBeenCalledWith('customer', 'pindex', test_city.pindex);
    });
  });
});

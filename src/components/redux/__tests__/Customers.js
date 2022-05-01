import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import customers, {
  requestCustomers,
  receiveCustomers,
  requestCustomer,
  receiveCustomer,
  requestUpdateCustomer,
  receiveUpdateCustomer,
  requestDeleteCustomer,
  receiveDeleteCustomer,
  requestSearchCustomers,
  receiveSearchCustomers,
  requestSearchCities,
  receiveSearchCities,
  fetchCustomersIfNeeded,
  fetchCustomerIfNeeded,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
  searchCities,

} from '../Customers';
import 'babel-polyfill';

describe('actions', () => {
  it('should create an action to request customers', () => {
    const expectedAction = {
      type: '[2]',
      error: false,
      payload: undefined,
    };
    expect(requestCustomers()).toEqual(expectedAction);
  });
  it('should create an action to receive customers', () => {
    const customers_info = {
      customers: [],
      totalCount: 0,
      page: '1',
      totalPages: 0,
    };
    const expectedAction = {
      type: '[3]',
      error: false,
      payload: customers_info,
    };
    expect(receiveCustomers(customers_info)).toEqual(expectedAction);
  });
  it('should create an action to request customer', () => {
    const expectedAction = {
      type: '[4]',
      error: false,
      payload: undefined,
    };
    expect(requestCustomer()).toEqual(expectedAction);
  });
  it('should create an action to receive customer', () => {
    const customer = {
      id: 1,
      name: 'test1',
      nick: 'test2',
    };
    const expectedAction = {
      type: '[5]',
      error: false,
      payload: customer,
    };
    expect(receiveCustomer(customer)).toEqual(expectedAction);
  });
  it('should create an action to request update customer', () => {
    const expectedAction = {
      type: '[6]',
      error: false,
      payload: undefined,
    };
    expect(requestUpdateCustomer()).toEqual(expectedAction);
  });
  it('should create an action to receive update customer', () => {
    const customer = {
      id: 1,
      name: 'test1',
      nick: 'test2',
    };
    const expectedAction = {
      type: '[7]',
      error: false,
      payload: customer,
    };
    expect(receiveUpdateCustomer(customer)).toEqual(expectedAction);
  });
  it('should create an action to request delete customer', () => {
    const expectedAction = {
      type: '[8]',
      error: false,
      payload: undefined,
    };
    expect(requestDeleteCustomer()).toEqual(expectedAction);
  });
  it('should create an action to receive delete customer', () => {
    const customer_id = 1;
    const expectedAction = {
      type: '[9]',
      error: false,
      payload: customer_id,
    };
    expect(receiveDeleteCustomer(customer_id)).toEqual(expectedAction);
  });
  it('should create an action to request search customers', () => {
    const expectedAction = {
      type: '[10]',
      error: false,
      payload: undefined,
    };
    expect(requestSearchCustomers()).toEqual(expectedAction);
  });
  it('should create an action to receive search customers', () => {
    const search_customers = [];
    const expectedAction = {
      type: '[11]',
      error: false,
      payload: search_customers,
    };
    expect(receiveSearchCustomers(search_customers)).toEqual(expectedAction);
  });
  it('should create an action to request search cities', () => {
    const expectedAction = {
      type: '[12]',
      error: false,
      payload: undefined,
    };
    expect(requestSearchCities()).toEqual(expectedAction);
  });
  it('should create an action to receive search cities', () => {
    const search_cities = [];
    const expectedAction = {
      type: '[13]',
      error: false,
      payload: search_cities,
    };
    expect(receiveSearchCities(search_cities)).toEqual(expectedAction);
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates Receive customers when fetching customers has been done', async () => {
    const page = '1';
    fetchMock.getOnce(`http://127.0.0.1:3000/api/customers.json?page=${page}&term=`, {
      body: {
        customers: ['customer1'],
        totalCount: 1,
        page: '1',
        totalPages: 1,
      },
      headers: {
        'content-type': 'application/json',
      },
    });

    const expectedActions = [
      {
        type: '[2]',
        error: false,
        payload: undefined,
      }, {
        type: '[3]',
        error: false,
        payload: {
          customers: ['customer1'],
          totalCount: 1,
          page: '1',
          totalPages: 1,
		    term: '',
        },
      },
    ];
    const store = mockStore({ customers: [] });
    return await store
      .dispatch(fetchCustomersIfNeeded(page))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates Receive customer when fetching existing customer has been done', async () => {
    const customer_id = 1;
    fetchMock.getOnce(`http://127.0.0.1:3000/api/customers/${customer_id}`, {
      body: {
        customer: 'customer1',
      },
      headers: {
        'content-type': 'application/json',
      },
    });

    const expectedActions = [
      {
        type: '[4]',
        error: false,
        payload: undefined,
      }, {
        type: '[5]',
        error: false,
        payload: {
          customer: 'customer1',
        },
      },
    ];
    const store = mockStore({ customer: '' });
    return await store
      .dispatch(fetchCustomerIfNeeded(customer_id))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates Receive customer when new customer', () => {
    const expectedActions = [
      {
        type: '[4]',
        error: false,
        payload: undefined,
      }, {
        type: '[5]',
        error: false,
        payload: {},
      },
    ];
    const store = mockStore({ customer: '' });
    store.dispatch(fetchCustomerIfNeeded('new'));
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates Update customer when updating existing customer has been done', () => {
    const values = {
      id: 1,
      name: 'test1',
      nick: 'test1',
    };
    fetchMock.putOnce(`http://127.0.0.1:3000/api/customers/${values.id}`, {
      body: values,
      headers: {
        'content-type': 'application/json',
      },
    });

    const expectedActions = [
      {
        type: '[6]',
        error: false,
        payload: undefined,
      }, {
        type: '[7]',
        error: false,
        payload: values,

      },
    ];
    const store = mockStore({ customers: { customer: { id: values.id } } });
    return store
      .dispatch(updateCustomer(values))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates Create customer when creating new customer has been done', () => {
    const values = {
      name: 'test1',
      nick: 'test1',
    };
    fetchMock.postOnce('http://127.0.0.1:3000/api/customers/', {
      body: values,
      headers: {
        'content-type': 'application/json',
      },
    });

    const expectedActions = [
      {
        type: '[6]',
        error: false,
        payload: undefined,
      }, {
        type: '[7]',
        error: false,
        payload: values,

      },
    ];
    const store = mockStore({ customers: { customer: {} } });
    return store
      .dispatch(updateCustomer(values))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates Delete customer when deleting customer has been done', () => {
    const customer_id = 1;
    fetchMock.deleteOnce(`http://127.0.0.1:3000/api/customers/${customer_id}`, {
      headers: {
        'content-type': 'application/json',
      },
    });

    const expectedActions = [
      {
        type: '[8]',
        error: false,
        payload: undefined,
      }, {
        type: '[9]',
        error: false,
        payload: customer_id,
      },
    ];
    const store = mockStore({ customer: '' });
    return store
      .dispatch(deleteCustomer(customer_id))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates Search customers when searching customers has been done', async () => {
    const value = 'test1';
    fetchMock.getOnce(`http://127.0.0.1:3000/api/customers/autocomplete/${value}`, {
      body: {
        customers: ['customer1'],
      },
      headers: {
        'content-type': 'application/json',
      },
    });

    const expectedActions = [
      {
        type: '[10]',
        error: false,
        payload: undefined,
      }, {
        type: '[11]',
        error: false,
        payload: ['customer1'],

      },
    ];
    const store = mockStore({ customers: [] });
    return await store
      .dispatch(searchCustomers(value))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates Search cities when searching cities has been done', async () => {
    const value = 'test1';
    fetchMock.getOnce(`http://127.0.0.1:3000/api/cities/autocomplete/${value}`, {
      body: {
        cities: ['city1'],
      },
      headers: {
        'content-type': 'application/json',
      },
    });

    const expectedActions = [
      {
        type: '[12]',
        error: false,
        payload: undefined,
      }, {
        type: '[13]',
        error: false,
        payload: {
          cities: ['city1'],
        },
      },
    ];
    const store = mockStore({ customers: [] });
    return await store
      .dispatch(searchCities(value))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

const init_customers_info = {
  customers: [],
  totalCount: 0,
  page: null,
  totalPages: 0,
  term: null,
};

describe('customers reducer', () => {
  it('should return the initial state', () => {
    expect(customers(undefined, {})).toEqual({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle requestCustomers', () => {
    expect(customers({}, { type: '[2]' })).toEqual({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
    });

    expect(customers({
      ...init_customers_info,
      isFetching: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    }, { type: '[2]' })).toEqual({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle receiveCustomers', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    }, {
      type: '[3]',
      payload: {
        customers: ['customer1'],
        totalCount: 1,
        page: '1',
        totalPages: 1,
      },
    })).toEqual({
      customers: ['customer1'],
      totalCount: 1,
      page: '1',
      totalPages: 1,
      isFetching: false,
      didInvalidate: false,
      loaded: true,
      customer: null,
      search_customers: [],
      search_cities: [],
	    term: null,
    });
  });

  it('should handle requestCustomer', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    }, { type: '[4]' })).toEqual({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle receiveCustomer', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    }, {
      type: '[5]',
      payload: 'customer1',
    })).toEqual({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: 'customer1',
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle requestUpdateCustomer', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    }, { type: '[6]' })).toEqual({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle receiveUpdateCustomer for existing customer', () => {
    expect(customers({
      customers: [{ id: 1, name: 'old name' }, { id: 2, name: 'other customer name' }],
      totalCount: 0,
      page: '1',
      totalPages: 0,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: { id: 1, name: 'old name' },
      search_customers: [],
      search_cities: [],
    }, {
      type: '[7]',
      payload: { id: 1, name: 'new name' },
    })).toEqual({
      customers: [{ id: 2, name: 'other customer name' }, { id: 1, name: 'new name' }],
      totalCount: 0,
      page: '1',
      totalPages: 0,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: { id: 1, name: 'new name' },
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle receiveUpdateCustomer for new customer', () => {
    expect(customers({
      customers: [{ id: 1, name: 'other customer name' }],
      totalCount: 0,
      page: '1',
      totalPages: 0,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    }, {
      type: '[7]',
      payload: { id: 2, name: 'name' },
    })).toEqual({
      customers: [{ id: 1, name: 'other customer name' }, { id: 2, name: 'name' }],
      totalCount: 0,
      page: '1',
      totalPages: 0,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: { id: 2, name: 'name' },
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle requestDeleteCustomer', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    }, { type: '[8]' })).toEqual({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle receiveDeleteCustomer', () => {
    expect(customers({
      customers: [{ id: 1, name: 'name' }, { id: 2, name: 'other customer name' }],
      totalCount: 2,
      page: '1',
      totalPages: 1,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    }, {
      type: '[9]',
      payload: 1,
    })).toEqual({
      customers: [{ id: 2, name: 'other customer name' }],
      totalCount: 1,
      page: '1',
      totalPages: 1,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle requestSearchCustomers', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: ['test1'],
      search_cities: [],
    }, { type: '[10]' })).toEqual({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle receiveSearchCustomers', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: ['customer1', 'customer2'],
      search_cities: [],
    }, {
      type: '[11]',
      payload: ['customer3', 'customer4'],
    })).toEqual({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: true,
      customer: null,
      search_customers: ['customer3', 'customer4'],
      search_cities: [],
    });
  });

  it('should handle requestSearchCities', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: ['test1'],
    }, { type: '[12]' })).toEqual({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: [],
    });
  });

  it('should handle receiveSearchCities', () => {
    expect(customers({
      ...init_customers_info,
      isFetching: true,
      didInvalidate: false,
      loaded: false,
      customer: null,
      search_customers: [],
      search_cities: ['city1', 'city2'],
    }, {
      type: '[13]',
      payload: ['city3', 'city4'],
    })).toEqual({
      ...init_customers_info,
      isFetching: false,
      didInvalidate: false,
      loaded: true,
      customer: null,
      search_customers: [],
      search_cities: ['city3', 'city4'],
    });
  });
});

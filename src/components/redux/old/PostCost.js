// import {createAction, createReducer} from 'redux-act'
import fetchJsonp from 'fetch-jsonp'
// import axios from 'axios'
// import querystring from 'querystring'
// import { errorHandler } from './ErrorHandlers'

const reducerActions = {}

const requestPostCost = createAction('requestPostCost')
const successPostCost = createAction('successPostCost')
const failedPostCost = createAction('failedPostCost')

const initialState = {
  postCost: null,
  isFetching: false,
  loaded: false,
  errors: null,
}

reducerActions[requestPostCost] = (state) => ({
  ...state,
  isFetching: true,
  loaded: false,
  errors: null,
})

reducerActions[successPostCost] = (state, postCost) => ({
  ...state,
  postCost,
  isFetching: false,
  loaded: true,
  errors: null,
})

reducerActions[failedPostCost] = (state, errors) => ({
  ...state,
  postCost: null,
  isFetching: false,
  loaded: false,
  errors,
})

const postCost = createReducer(reducerActions, initialState)

export default postCost

// Server requests:

const POST_BASE_URL = 'http://test.postcalc.ru'

const PARAMS = {
  f: 'Иваново',
  o: 'json',
  st: 'localhost',
  ml: 'obp2000@mail.ru',
  key: 'test',
}

const fullUrl = (pindex, weight) => [POST_BASE_URL,
  querystring.stringify({
    t: pindex,
    w: weight,
    ...PARAMS,
  }),
].join('/?')

// Async actions:

export const getPostCostNW = (dispatch, pindex, weight) => () => {
  if (weight && pindex) {
    dispatch(requestPostCost())
    return fetchJsonp(fullUrl(pindex, weight))
    // .then(response => response.json())
        .then(({
          Отправления: {
            ЦеннаяПосылка: {
              Тариф,
            } = {},
          } = {},
        }) => {
          // dispatch(change('order', 'post_cost', parseInt(Тариф)))
          dispatch(successPostCost(parseInt(Тариф)))
        })
    // .catch(errorHandler(dispatch, failedPostCost))
  }
}

export const getPostCost1 = (pindex, weight) => {
  if (weight && pindex) {
    return fetchJsonp(fullUrl(pindex, weight))
        .then((response) => response.json())
        .then(({
          Отправления: {
            ЦеннаяПосылка: {
              Тариф,
            } = {},
          } = {},
        }) => parseInt(Тариф))
        .catch((e) => {
          console.log(e)
          alert(e.message)
        })
  }
}

export const getPostCost = (pindex, weight) => {
  try {
    getPostCost1(pindex, weight)
  } catch (e) {e => e}
}

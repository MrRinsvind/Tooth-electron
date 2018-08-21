// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counter'
import clients from './clients'
import price from './price'
import filters from './filters'

const rootReducer = combineReducers({
  counter,
  router,
  clients,
  price,
  filters,
})

export default rootReducer

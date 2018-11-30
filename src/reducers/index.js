import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
//import session from 'redux-persist/lib/storage/session'
import localForage from 'localforage'

import global from "./global.reducer"
// import sign from "./sign.reducer"

const appReducer = combineReducers({
  global: persistReducer({
    key: 'global',
    storage: localForage,
    blacklist: ['apiService']
  }, global),

  // sign: persistReducer({
  //   key: 'sign',
  //   storage: localForage
  // }, sign)
})

const rootReducer = (state, action) => {

  return appReducer(state, action)
}

export default rootReducer

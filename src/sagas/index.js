import { fork, all, takeEvery, select } from 'redux-saga/effects'

import { watchGlobal } from './global.saga'

export default function* root() {
  yield all([
    fork(watchGlobal),
  ])
}

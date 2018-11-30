import { take, put, call, fork, select, takeEvery, all, cancel } from 'redux-saga/effects'


function* initTokenConfig(action) {
  console.log("++++++++++++ run to init token config")
}



export function* watchGlobal() {
  yield takeEvery("GLOBAL.INIT_CONFIG", initTokenConfig)
}

import { fork } from 'redux-saga/effects';

import { saga as todos } from './todos';

export default function* rootSaga() {
  yield fork(todos);
}

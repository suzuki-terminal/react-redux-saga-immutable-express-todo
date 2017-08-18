import { take, fork, put, call, select } from 'redux-saga/effects';
import axios from 'axios';

import {
  update,
  FETCH_TODOS,
  SET_TODOS_INPUT_TITLE,
  ADD_TODOS_ITEM,
  UPDATE_TODOS_ITEM,
  DELETE_TODOS_ITEM,
} from './action';

/**
 * リスト取得
 */
function* handleFetchTodos() {
  while (true) {
    yield take(FETCH_TODOS);

    let todos = yield select(state => state.todos);

    todos = todos.fetching();
    yield put(update(todos));

    const { data } = yield call(axios.get, '/api/todos');

    todos = todos.fetched({ items: data.todos });
    yield put(update(todos));
  }
}

/**
 * 入力値のセット
 */
function* handleSetTodosInputTitle() {
  while (true) {
    const { payload } = yield take(SET_TODOS_INPUT_TITLE);

    const todos = yield select(state => state.todos);
    yield put(update(todos.setInputTitle({ inputTitle: payload })));
  }
}

/**
 * 追加
 */
function* handleAddTodosItem() {
  while (true) {
    yield take(ADD_TODOS_ITEM);

    const todos = yield select(state => state.todos);

    const { data: { todo } } = yield call(axios.post, '/api/todos', { title: todos.inputTitle });

    yield put(update(todos.addItem({ item: todo }).clearInputTitle()));
  }
}

/**
 * 更新 (ステータス)
 */
function* handleUpdateTodosItem() {
  while (true) {
    const { payload: { todo } } = yield take(UPDATE_TODOS_ITEM);

    const { data } = yield call(axios.put, `/api/todos/${todo.id}`, { todo: todo.set('completed', !todo.completed).toJS() });

    const todos = yield select(state => state.todos);
    yield put(update(todos.updateItem({ item: data.todo })));
  }
}

/**
 * 削除
 */
function* handleDeleteTodosItem() {
  while (true) {
    const { payload: { todo } } = yield take(DELETE_TODOS_ITEM);

    yield call(axios.delete, `/api/todos/${todo.id}`);

    const todos = yield select(state => state.todos);
    yield put(update(todos.deleteItem({ item: todo })));
  }
}


export default function* rootSaga() {
  yield fork(handleFetchTodos);
  yield fork(handleSetTodosInputTitle);
  yield fork(handleAddTodosItem);
  yield fork(handleUpdateTodosItem);
  yield fork(handleDeleteTodosItem);
}
import { createAction } from 'redux-actions';
import shortid from 'shortid';

export const UPDATE = shortid.generate();
export const update = createAction(UPDATE);


export const FETCH_TODOS = shortid.generate();
export const fetchTodos = createAction(FETCH_TODOS);

export const ADD_TODOS_ITEM = shortid.generate();
export const addTodosItem = createAction(ADD_TODOS_ITEM);

export const UPDATE_TODOS_ITEM = shortid.generate();
export const updateTodosItem = createAction(UPDATE_TODOS_ITEM);

export const DELETE_TODOS_ITEM = shortid.generate();
export const deleteTodosItem = createAction(DELETE_TODOS_ITEM);

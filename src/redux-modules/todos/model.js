import { Record, List } from 'immutable';

export class Filter extends Record({
  completed: null,
}) {

}

export class Todo extends Record({
  id: null,
  title: null,
  completed: null,
  createdAt: null,
}) {

}

export class Todos extends Record({
  inputTitle: '',
  fetch: false,
  filter: new Filter(),
  items: new List(),
}) {

  get filteredTodoItems() {
    if (this.filter.completed === null) {
      return this.items;
    }

    return this.items.filter(i => i.completed === this.filter.completed);
  }

  setFilter({ completed }) {
    return this.setIn(['filter', 'completed'], completed);
  }

  fetching() {
    return this.set('fetch', true);
  }

  fetched({ items = [] }) {
    return this
      .set('fetch', false)
      .set('items', new List(items.map(i => new Todo(i))));
  }

  setInputTitle({ inputTitle }) {
    return this.set('inputTitle', inputTitle);
  }

  clearInputTitle() {
    return this.set('inputTitle', '');
  }

  addItem({ item }) {
    return this.set('items', this.items.push(new Todo(item)));
  }

  updateItem({ item }) {
    return this.set('items', this.items.update(
      this.items.findIndex(i => i.id === item.id),
      i => i.merge(item),
    ));
  }

  deleteItem({ item }) {
    return this.set('items', this.items.delete(this.items.findIndex(i => i.id === item.id)));
  }

}

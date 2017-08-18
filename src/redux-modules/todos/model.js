import { Record, List } from 'immutable';

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
  items: new List(),
}) {

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

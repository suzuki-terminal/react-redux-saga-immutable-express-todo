import { UPDATE } from './action';
import { Todos } from './model';

export default function reducer(state = new Todos(), { type, payload }) {
  switch (type) {
    case UPDATE: {
      return payload;
    }

    default: {
      return state;
    }
  }
}

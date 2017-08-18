import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  fetchTodos,
  addTodosItem,
  updateTodosItem,
  deleteTodosItem,
  Todos,
} from '../redux-modules/todos';

const propTypes = {
  todos: PropTypes.instanceOf(Todos).isRequired,
  fetchTodos: PropTypes.func,
  addTodosItem: PropTypes.func,
  updateTodosItem: PropTypes.func,
  deleteTodosItem: PropTypes.func,
};

class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <div
        className="container"
        style={{ padding: '20px' }}
      >
        <form
          className="form-inline"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.addTodosItem({ title: this.state.title });
            this.setState({ title: '' });
          }}
        >
          <input
            className="form-control form-control-lg"
            type="text"
            value={this.state.title}
            onChange={({ target: { value } }) => this.setState({ title: value })}
          />

          <button className="btn btn-primary">追加</button>
        </form>

        <br />

        {this.props.todos.fetch
          ? (
            <p>Loading...</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>タイトル</th>
                  <th>ステータス</th>
                  <th>作成日</th>
                  <th />
                  <th />
                </tr>
              </thead>

              <tbody>
                {this.props.todos.items.map(todo =>
                  <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.completed ? '完了' : '未完了'}</td>
                    <td>{moment(todo.createdAt).format('YYYY/MM/DD HH:mm')}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => this.props.updateTodosItem({ todo })}
                      >
                        {todo.completed ? '未完了に戻す' : '完了にする'}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.props.deleteTodosItem({ todo })}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTodos,
    addTodosItem,
    updateTodosItem,
    deleteTodosItem,
  }, dispatch);
}

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

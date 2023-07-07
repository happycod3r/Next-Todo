'use client'

import React from 'react'; 
import dynamic from 'next/dynamic'; 

const TodoItem = dynamic(() => import('./TodoItem'), { ssr: false });

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: 'all'
    };
  }

  addTodo = (text, importance) => {
    const timestamp = new Date().toLocaleString();
    const newTodo = {
      text: text,
      importance: importance,
      timestamp: timestamp
    };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo]
    }));
  }

  deleteTodo = index => {
    this.setState(prevState => ({
      todos: prevState.todos.filter((_, i) => i !== index)
    }));
  }

  rearrangeTodos = (oldIndex, newIndex) => {
    this.setState(prevState => {
      const todos = [...prevState.todos];
      const [removed] = todos.splice(oldIndex, 1);
      todos.splice(newIndex, 0, removed);
      return { todos };
    });
  }

  updateFilter = filterValue => {
    this.setState({ filter: filterValue });
  }

  filterTodos = () => {
    const { todos, filter } = this.state;
    if (filter === 'all') {
      return todos;
    } else {
      return todos.filter(todo => todo.importance === filter);
    }
  }

  render() {
    const { todos, filter } = this.state;
    const filteredTodos = this.filterTodos();

    return (
      <div>
        <div>
          <button onClick={() => this.updateFilter('all')} disabled={filter === 'all'}>All</button>
          <button onClick={() => this.updateFilter('low')} disabled={filter === 'low'}>Low</button>
          <button onClick={() => this.updateFilter('medium')} disabled={filter === 'medium'}>Medium</button>
          <button onClick={() => this.updateFilter('high')} disabled={filter === 'high'}>High</button>
          <button onClick={() => this.updateFilter('critical')} disabled={filter === 'critical'}>Critical</button>
        </div>
        <ul>
          {filteredTodos.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              deleteTodo={this.deleteTodo}
              rearrangeTodos={this.rearrangeTodos}
            />
          ))}
        </ul>
 
        <form onSubmit={e => {
          e.preventDefault();
          const text = e.target.elements.text.value;
          const importance = e.target.elements.importance.value;
          if (text.trim() !== '') {
            this.addTodo(text, importance);
            e.target.reset();
          }
        }}>
        <input type="text" name="text" placeholder="Add a new todo item" />
          <select name="importance">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default TodoList;

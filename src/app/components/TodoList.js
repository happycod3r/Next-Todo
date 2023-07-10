'use client'

import React from 'react'; 
import dynamic from 'next/dynamic';
import Image from 'next/image';
import addIcon from "./../../../public/ui/add-green.png";
import ColorPreview from './ColorPreview.js';
import CurentTime from './CurrentTime.js'

const TodoItem = dynamic(() => import('./TodoItem'), { ssr: false });

class TodoList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            filter: 'all',
            todoCount: 0
        };
    }

    addTodo = (text, importance) => {
    
        const timestamp = new Date().toLocaleString();
    
        const newTodo = {
            text: text,
            importance: importance,
            timestamp: timestamp,
            done: false,
            timeFinished: null
        };

        this.setState(prevState => ({
            todos: [...prevState.todos, newTodo],
            todoCount: prevState.todoCount + 1
        }));
    }

    deleteTodo = index => {
        this.setState(prevState => ({
            todos: prevState.todos.filter((_, i) => i !== index),
            todoCount: prevState.todoCount -1
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
        } else if (filter === 'done') {
            return todos.filter(todo => todo.done);
        } else {
            return todos.filter(todo => todo.importance === filter);
        }
    }

    toggleDone = index => {
        this.setState(prevState => {
            const todos = [...prevState.todos];
            todos[index].done = !todos[index].done;
            if (todos[index].done) {
                todos[index].timeFinished = new Date().toLocaleString();
            } else {
                todos[index].timeFinished = null;
            }
            return { todos };
        });
    }

    render() {
        const { todos, filter, todoCount } = this.state;
        const filteredTodos = this.filterTodos();

        return (
            <div id='main-container'>
                <div id='filter-btn-container'>
                    <button id='filter-all-btn' className='filter-btn' onClick={() => this.updateFilter('all')} disabled={filter === 'all'}>All</button>
                    <button id='filter-low-btn' className='filter-btn' onClick={() => this.updateFilter('low')} disabled={filter === 'low'}>Low</button>
                    <button id='filter-medium-btn' className='filter-btn' onClick={() => this.updateFilter('medium')} disabled={filter === 'medium'}>Medium</button>
                    <button id='filter-high-btn' className='filter-btn' onClick={() => this.updateFilter('high')} disabled={filter === 'high'}>High</button>
                    <button id='filter-critical-btn' className='filter-btn' onClick={() => this.updateFilter('critical')} disabled={filter === 'critical'}>Critical</button>
                    <button id='filter-done-btn' className='filter-btn' onClick={() => this.updateFilter('done')} disable={filter === 'done'}>Done</button>
                    <button id='filter-idea-btn' className='filter-btn' onClick={() => this.updateFilter('idea')} disable={filter === 'idea'}>Idea</button>  
                    <button id='filter-note-btn' className='filter-btn' onClick={() => this.updateFilter('note')} disable={filter === 'note'}>Note</button>  
                    <button id='filter-reminder-btn' className='filter-btn' onClick={() => this.updateFilter('reminder')} disable={filter === 'reminder'}>Reminder</button>  
                </div>
                <ul id='todo-list'>
                    {filteredTodos.map((todo, index) => (
                        <TodoItem
                            key={index}
                            index={index}
                            todo={todo}
                            deleteTodo={this.deleteTodo}
                            rearrangeTodos={this.rearrangeTodos}
                            toggleDone={this.toggleDone}
                        />
                    ))}
                </ul>
 
                <form id='new-todo-form' onSubmit={e => {
                    e.preventDefault();
                    const text = e.target.elements.text.value;
                    const importance = e.target.elements.importance.value;
                    if (text.trim() !== '') {
                        this.addTodo(text, importance);
                        e.target.reset();
                    }
                }}>
                    
                    <ColorPreview />

                    <select id='importance-selector' title='importance-selector' name="importance">
                        <option id='low-importance-option' className='importance-selector-option' value="low">Low</option>
                        <option id='medium-importance-option' className='importance-selector-option' value="medium">Medium</option>
                        <option id='high-importance-option' className='importance-selector-option' value="high">High</option>
                        <option id='critical-importance-option' className='importance-selector-option' value="critical">Critical</option>
                        <option id='idea-importance-option' className='importance-selector-option' value="idea">Idea</option>
                        <option id='note-importance-option' className='importance-selector-option' value="note">Note</option>
                        <option id='reminder-importance-option' className='importance-selector-option' value="reminder">Reminder</option>
                    </select>
                    <input id='new-todo-input' type="text" name="text" placeholder="Add a new todo item" />
                    <button id='add-new-todo-btn' type="submit">
                        <Image id='add-new-todo-btn-icon' src={addIcon} alt='delete' width={32} height={32} loading='lazy'/>
                    </button>
                    <div id='todo-count-display-container'>
                        <p id='todo-count-display'>Items: {todoCount}</p>
                    </div>
                    <CurentTime />
                </form>
            </div>
        );
    }
}

export default TodoList;

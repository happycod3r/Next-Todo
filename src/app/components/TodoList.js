'use client'

import React from 'react'; 
import dynamic from 'next/dynamic';
import Image from 'next/image';
import addIcon from "./../../../public/ui/add-green.png"
import ColorPreview from './ColorPreview';
import Clock from './Clock'
import Text from '../js/strings'

const TodoItem = dynamic(() => import('./TodoItem'), { ssr: false });
const setTodo = dynamic(() => import('@/db'), { ssr: false });

class TodoList extends React.Component {
    
    constructor(props) {
        super(props);
        this.filters = ['all', 'low', 'medium', 'high', 'critical', 'done', 'idea', 'note', 'reminder'];

        this.state = {
            todos: [],
            filter: this.filters[0], // default filter is 'all'
            todoCount: 0
        };
    }

    addTodo = async (text, importance) => {
        const timestamp = new Date().toLocaleString();
        const newTodo = {
            text: text,
            importance: importance,
            timestamp: timestamp,
            timeFinished: null,
            done: false
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
        if (filter === this.filters[0]) {
            return todos;
        } else if (filter === this.filters[5]) {
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
                    <button id='filter-all-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[0])} disabled={filter === this.filters[0]}>{Text.filterAllBtnTxt}</button>
                    <button id='filter-low-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[1])} disabled={filter === this.filters[1]}>{Text.todoTypeLowTxt}</button>
                    <button id='filter-medium-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[2])} disabled={filter === this.filters[2]}>{Text.todoTypeMediumTxt}</button>
                    <button id='filter-high-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[3])} disabled={filter === this.filters[3]}>{Text.todoTypeHighTxt}</button>
                    <button id='filter-critical-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[4])} disabled={filter === this.filters[4]}>{Text.todoTypeCriticalTxt}</button>
                    <button id='filter-done-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[5])} disable={filter === this.filters[5]}>{Text.filterDoneBtnTxt}</button>
                    <button id='filter-idea-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[6])} disable={filter === this.filters[6]}>{Text.todoTypeIdeaTxt}</button>
                    <button id='filter-note-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[7])} disable={filter === this.filters[7]}>{Text.todoTypeNoteTxt}</button>
                    <button id='filter-reminder-btn' className='filter-btn' onClick={() => this.updateFilter(this.filters[8])} disable={filter === this.filters[8]}>{Text.todoTypeReminderTxt}</button>  
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
 
                <form id='new-todo-form' onSubmit={async e => {
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
                        <option id='low-importance-option' className='importance-selector-option' value={this.filters[1]}>{Text.todoTypeLowTxt}</option>
                        
                        <option id='medium-importance-option' className='importance-selector-option' value={this.filters[2]}>{Text.todoTypeMediumTxt}</option>
                        
                        <option id='high-importance-option' className='importance-selector-option' value={this.filters[3]}>{Text.todoTypeHighTxt}</option>
                        
                        <option id='critical-importance-option' className='importance-selector-option' value={this.filters[4]}>{Text.todoTypeCriticalTxt}</option>
                        
                        <option id='idea-importance-option' className='importance-selector-option' value={this.filters[6]}>{Text.todoTypeIdeaTxt}</option>
                        
                        <option id='note-importance-option' className='importance-selector-option' value={this.filters[7]}>{Text.todoTypeNoteTxt}</option>
                        
                        <option id='reminder-importance-option' className='importance-selector-option' value={this.filters[8]}>{Text.todoTypeReminderTxt}</option>
                    </select>
                    
                    <input id='new-todo-input' type="text" name="text" placeholder="Add a new todo item" />
                    <button onClick={() => {
                        
                    }} id='add-new-todo-btn' type="submit">
                        <Image id='add-new-todo-btn-icon' src={addIcon} alt='delete' width={32} height={32} />
                    </button>

                    <div id='todo-count-display-container'>
                        <p id='todo-count-display'>{Text.itemCountPrependedTxt} {todoCount}</p>
                    </div>
                    <Clock />
                </form>
            </div>
        );
    }
}

export default TodoList;

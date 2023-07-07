'use client'

import React from 'react';

const TodoItem = ({ index, todo, deleteTodo, rearrangeTodos, toggleDone }) => {
    const { text, importance, timestamp, done } = todo;
    const importanceColors = {
        low: 'green',
        medium: 'yellow',
        high: 'orange',
        critical: 'red'
    };

    const todoItemClass = done ? 'todo-item done' : 'todo-item';

    return (
        <li>
            <span className={todoItemClass}>
                {text}
            </span>
            <span style={{ color: importanceColors[importance] }}> 
                [{importance}]
            </span>
            <span> 
                - Created at {timestamp}
            </span>
            <button onClick={() => deleteTodo(index)}>Delete</button>
            <button disabled={index === 0} onClick={() => rearrangeTodos(index, index - 1)}>Move Up</button>
            <button disabled={index === todo.length - 1} onClick={() => rearrangeTodos(index, index + 1)}>Move Down</button>
            <input type="checkbox" checked={done} onChange={() => toggleDone(index)} />
        </li>
    );
};
    
export default TodoItem;

'use client'

import React from 'react';
import Image from 'next/image';
import trashIcon from "../../../public/ui/trash-can-solid.svg";
import arrowUpIcon from "../../../public/ui/arrow-up-solid.svg";
import arrowDownIcon from "../../../public/ui/arrow-down-solid.svg";

const TodoItem = ({ index, todo, deleteTodo, rearrangeTodos, toggleDone }) => {
    const { text, importance, timestamp, done, timeFinished } = todo;
    const importanceColors = {
        low: '#90be6d',
        medium: '#f9c74f',
        high: '#f9844a',
        critical: '#f94144'
    };

    const todoItemClass = done ? 'todo-item done' : 'todo-item';

    return (
        <li className='todo-list-item'>
            <span className={todoItemClass}>
                {text}
            </span>
            <span className='importance-lvl' style={{ color: importanceColors[importance] }}> 
                [{importance}]
            </span>
            <span className='created-time-stamp'> 
                <span className='timestamp-txt'>Created @</span> {timestamp} :
                {done && timeFinished && (
                    <span className='done-time-stamp'><span className='timestamp-txt'>Finished @</span> {timeFinished}</span>
                )}
            </span>
            <div className='todo-item-ctrls-container'>
                <button className='delete-todo-btn form-btn' onClick={() => deleteTodo(index)}>
                    <Image className='icon' src={trashIcon} alt='delete' width={18} height={18}/>
                </button>
                <button className='move-todo-up-btn form-btn' disabled={index === 0} onClick={() => rearrangeTodos(index, index - 1)}>
                    <Image className='icon' src={arrowUpIcon} alt='move up' width={18} height={18}/>
                </button>
                <button className='move-todo-down-btn form-btn' disabled={index === todo.length - 1} onClick={() => rearrangeTodos(index, index + 1)}>
                    <Image className='icon' src={arrowDownIcon} alt='move down' width={18} height={18}/>
                </button>
                <input className='toggle-done-checkbox' type="checkbox" checked={done} onChange={() => toggleDone(index)} />
            </div>
        </li>
    );
};
    
export default TodoItem;

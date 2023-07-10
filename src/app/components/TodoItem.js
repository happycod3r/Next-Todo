'use client'

import React from 'react';
import Image from 'next/image';
import trashIcon from "../../../public/ui/trash-red (1).png";
import arrowUpIcon from "../../../public/ui/arrow-up.png";
import arrowDownIcon from "../../../public/ui/arrow-down.png";
import Text from '../js/strings'

const TodoItem = ({ index, todo, deleteTodo, rearrangeTodos, toggleDone }) => {
    const { text, importance, timestamp, done, timeFinished } = todo;
    const importanceColors = {
        low: '#90be6d',
        medium: '#f9c74f',
        high: '#f9844a',
        critical: '#f94144',
        idea: '#277da1',
        note: '#edf2f4',
        reminder: '#5a189a'
    };

    const todoItemClass = done ? 'todo-item done' : 'todo-item';

    return (
        <li className='todo-list-item'>
        <div className='todo-item-number-container'>
            <p className='todo-item-number'>{index + 1}</p>
        </div>    
        <div className='todo-item-ctrls-container'>
                <button className='delete-todo-btn todo-item-ctrl-btn' onClick={() => deleteTodo(index)}>
                    <Image className='btn-icon' src={trashIcon} alt='delete' width={20} height={20} loading='lazy'/>
                </button>
                <button className='move-todo-up-btn todo-item-ctrl-btn' disabled={index === 0} onClick={() => rearrangeTodos(index, index - 1)}>
                    <Image className='btn-icon' src={arrowUpIcon} alt='move up' width={20} height={20} loading='lazy'/>
                </button>
                <button className='move-todo-down-btn todo-item-ctrl-btn' disabled={index === todo.length - 1} onClick={() => rearrangeTodos(index, index + 1)}>
                    <Image className='btn-icon' src={arrowDownIcon} alt='move down' width={20} height={20} loading='lazy'/>
                </button>
                <input className='toggle-done-checkbox' type="checkbox" checked={done} onChange={() => toggleDone(index)} />
            </div>
            
            <span className='created-time-stamp'> 
                <span className='timestamp-txt'>{Text.createdTimeStampTxt}</span> {timestamp} :
                {done && timeFinished && (
                    <span className='done-time-stamp'><span className='timestamp-txt'>{Text.finishedTimeStampTxt}</span> {timeFinished}</span>
                )}
            </span>
            
            <span className={todoItemClass}>
                {text}
            </span>
            
            <span className='importance-lvl' style={{ color: importanceColors[importance] }}> 
                [{importance}]
            </span>
        </li>
    );
};
    
export default TodoItem;

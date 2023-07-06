'use client'

import React from 'react';

const TodoItem = ({ index, todo, deleteTodo, rearrangeTodos }) => {
    const { text, importance, timestamp } = todo;
    const importanceColors = {
      low: 'green',
      medium: 'yellow',
      high: 'orange',
      critical: 'red'
    };

    return (
        <li>
          <span>{text}</span>
          <span style={{ color: importanceColors[importance] }}> [{importance}]</span>
          <span> - Created at {timestamp}</span>
          <button onClick={() => deleteTodo(index)}>Delete</button>
          <button disabled={index === 0} onClick={() => rearrangeTodos(index, index - 1)}>Move Up</button>
          <button disabled={index === todo.length - 1} onClick={() => rearrangeTodos(index, index + 1)}>Move Down</button>
        </li>
      );
    };
    
    export default TodoItem;

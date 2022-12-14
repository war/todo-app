import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false
    },
    {
      text: 'Build a todo app in React',
      isCompleted: false
    }
  ]);

  function handleTodoClick(selectedTodo: any) {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.text}
          onClick={() => handleTodoClick(todo)}
          style={{
            textDecoration: todo.isCompleted ? 'line-through' : 'none'
          }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

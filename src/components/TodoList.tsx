import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { CheckCircleIcon, LockClosedIcon, PlusIcon, StopIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { resourceLimits } from 'worker_threads';
import { Todo } from '@prisma/client';
import { TodoItem } from './TodoItem';

interface Props {
  enabled: boolean;
  tasks: Array<Todo>;
}

const blankTask: Todo = { id: "0", title: "", description: "", completed: false, createdAt: new Date(), ownerId: "0" };

function TodoList(props: Props) {
  const [todoArray, setTodoList] = useState<Todo[]>(props.tasks);
  const [todoInput, setTodoInput] = useState('');

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    //trpc.todo.createTask.mutate(todoInputDb);

    setTodoList([...todoArray, todoInput.trim()]);
    setTodoInput('');
  };

  const markCompleted = (index: number) => {
    if (todoArray.length !== 0 && todoArray[index] != null) {
      const task = todoArray[index];
      task.description = `✅ ${task.description}`;
      setTodoList(task);
    }
  };

  const removeTodo = (index: number) => {
    const newTodoList = [...todoArray];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const getTodos = async () => {
    const tasks = await fetch("/api/todo/taskGetAll");
    const temp: Array<Todo> = await tasks.json();
    const tasksDesc = temp.map((t) => { return t.description });
    
    const meme = await tasksDesc.length > 0 ? tasksDesc : ["No tasks found"];
    setTodoList(meme);
  }

  useEffect(() => {
    if (todoArray[0] == undefined) {
      getTodos();
    }
  }, []);

  if (!props.enabled) {
    return(<></>);
  }

  return (
    <div className="bg-white shadow sm:rounded-lg my-6 px-9">
      <div className="px-4 py-5 sm:p-4">
        <div className="mx-5 max-w-lg">
          <div>
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h2 className="mt-2 text-lg font-medium text-gray-900">Add team members</h2>
              <p className="mt-1 text-sm text-gray-500">
                very cool description yes yes.
              </p>
            </div>
            <form onSubmit={addTodo} className="mt-6 flex">
              <label htmlFor="text" className="sr-only">
                Todo Item:
              </label>
              <input
                value={todoInput}
                type="text"
                name="text"
                id="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter an text"
                onChange={event => setTodoInput(event.target.value)}
              />
              
              <button
                type="submit"
                className="ml-4 flex-shrink-0 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add task
              </button>
              <button
                type="button"
                onClick={getTodos}
                className="ml-4 flex-shrink-0 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              > Refresh </button>
            </form>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-500">
            { (todoArray == undefined || todoArray.length == 0) ? 'No items in list' : 'Current items in list' }
            </h3>
            <ul role="list" className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
              { (todoArray == undefined || todoArray.length == 0) ? (<></>) : todoArray.map((item, index) => (
                <TodoItem task={item} key={index}></TodoItem>
              )) }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { signIn, signOut, useSession } from "next-auth/react";
import { CheckCircleIcon, LockClosedIcon, PlusIcon, StopIcon, XCircleIcon } from '@heroicons/react/20/solid'

interface Props {
  enabled: boolean;
}

function TodoList(props: Props) {
  const [todoList, setTodoList] = useState<string[]>([]);
  const [todoInput, setTodoInput] = useState('');

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    setTodoList([...todoList, todoInput]);
    setTodoInput('');
  };

  const markCompleted = (index: number) => {
    const newTodoList = [...todoList];
    newTodoList[index] = `✅ ${newTodoList[index]}`;
    setTodoList(newTodoList);
  };

  const removeTodo = (index: number) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  if (!props.enabled) {
    return(<></>);
  }

  return (
    <div className="bg-white shadow sm:rounded-lg my-6 px-9">
      <Switch.Group as="div" className="px-4 py-5 sm:p-4">
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
                Send invite
              </button>
            </form>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-500">
            { todoList.length > 0 ? 'Current items in list' : 'No items in list' }
            </h3>
            <ul role="list" className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
              {todoList.map((item, index) => (
                <li key={index} className="flex items-center justify-between space-x-3 py-4">
                  <div className="flex min-w-0 flex-1 items-center space-x-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{item}</p>
                      {/* <p className="truncate text-sm font-medium text-gray-500">gay</p> */}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => markCompleted(index)}
                      type="button"
                      className="inline-flex mr-3 items-center rounded-full border border-transparent bg-gray-100 py-2 px-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <CheckCircleIcon className="-ml-1 mr-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-900">
                        {' '}
                        Completed <span className="sr-only">{item}</span>{' '}
                      </span>
                    </button>
                    <button
                      onClick={() => removeTodo(index)}
                      type="button"
                      className="inline-flex items-center rounded-full border border-transparent bg-gray-100 py-2 px-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <XCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Switch.Group>
    </div>
  );
}

export default TodoList;
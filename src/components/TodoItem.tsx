import { z } from "zod";
import { Todo } from '@prisma/client';
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";


interface Props {
  task: string;
  key: number;
  completedHandler: (x: number) => null;
}

export function TodoItem(props: Props) {
  const markCompleted = props.completedHandler;

  return (
    <li key={props.key} className="flex items-center justify-between space-x-3 py-4">
      <div className="flex min-w-0 flex-1 items-center space-x-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{props.task}</p>
          {/* <p className="truncate text-sm font-medium text-gray-500">gay</p> */}
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={() => markCompleted(props.index)}
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
          onClick={() => removeTodo(props.index)}
          type="button"
          className="inline-flex items-center rounded-full border border-transparent bg-gray-100 py-2 px-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <XCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}
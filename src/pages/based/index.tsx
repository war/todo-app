import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Switch } from '@headlessui/react';
import { signIn, signOut, useSession } from "next-auth/react";
import TodoList from './components/TodoList';

import { trpc } from "../../utils/trpc";
import React, { use, useEffect, useState } from 'react';

import { taskGetAll, taskComplete } from "../../utils/todo";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Home: NextPage = () => {
  
  const hello = trpc.todo.taskGetAll.useQuery();
  const enabled = true;

  return (
    <>
      <Head>
        <title>Based todo app</title>
        <meta name="description" content="ultra swag" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ebebeb]">

        <div className="bg-white shadow sm:rounded-lg">
          <Switch.Group as="div" className="px-4 py-5 sm:p-6">
            <Switch.Label as="h3" className="text-lg font-medium leading-6 text-gray-900" passive>
              Todo List
            </Switch.Label>
            <div className="mt-2 sm:flex sm:items-start sm:justify-between">
              <div className="max-w-xl text-sm text-gray-500">
                <Switch.Description>
                Very cool Very swag Very cool Very swag Very cool very swag Very cool very swag.
                </Switch.Description>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
                <Switch
                  checked={enabled}
                  className={classNames(
                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
            </div>
          </Switch.Group>
        </div>

        <TodoList tasks={hello} enabled={enabled}></TodoList>
        </main>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

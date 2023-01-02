import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import TodoList from "../components/TodoList";
import { Todo } from '@prisma/client';

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const rawTasks = new Array<Todo>();
  rawTasks[0] = { id: "1", title: "test1", description: "test1", completed: false, createdAt: new Date(), ownerId: "1" };
  rawTasks[1] = { id: "2", title: "test2", description: "test2", completed: false, createdAt: new Date(), ownerId: "1" };
  rawTasks[2] = { id: "3", title: "test3", description: "test3", completed: false, createdAt: new Date(), ownerId: "1" };
  rawTasks[3] = { id: "4", title: "test4", description: "test4", completed: false, createdAt: new Date(), ownerId: "1" };

  const tasks = rawTasks;

  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-[3rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h3>
          <AuthShowcase />
          <div className="grid grid-cols-12 gap-4 sm:grid-cols-1 md:gap-12">
            <TodoList enabled={true} tasks={tasks}></TodoList>  
          </div>
        </div>
      </main>
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

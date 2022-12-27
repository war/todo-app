import { router } from "../trpc";
import { authRouter } from "./auth";
import { todoRouter } from "./todo";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  todo: todoRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

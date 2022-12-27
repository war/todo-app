import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const todoRouter = router({
  taskGetAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),

  taskCreate: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .mutation(({ input }) => {
      return input;
    }),
});

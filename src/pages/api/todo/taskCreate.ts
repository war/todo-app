import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const taskCreate = async (req: NextApiRequest, res: NextApiResponse) => {
  const { text } = req.body;
  const example = await prisma.todo.create({
    data: {
      name: "text",
      description: text,
      ownerId: "1",
    },
  });
  res.status(200).json(example);
};

export default taskCreate;
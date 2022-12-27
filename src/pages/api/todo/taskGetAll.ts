import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const taskGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await prisma.todo.findMany();
  res.status(200).json(examples);
};

export default taskGetAll;
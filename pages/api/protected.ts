import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).json({ error: "not authorized" });
    return;
  }

  res.json({ message: "authorized", session });
};

export default handler;

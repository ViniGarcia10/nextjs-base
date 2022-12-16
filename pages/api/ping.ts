/* import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  pong: boolean;
};

export default function Pong(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ pong: true });
}
 */

import { NextApiHandler } from "next";

const Pong: NextApiHandler = (req, res) => {
  res.json({ pong: true });
};

export default Pong;

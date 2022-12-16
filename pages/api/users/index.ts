import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlerGetUser: NextApiHandler = async (req, res) => {
  const { order, page } = req.query;
  const { start, itensOR } = req.body;

  const response = await api.getAllUsers(
    parseInt(page as string),
    order as string,
    start as string,
    itensOR
  );

  return res.json(response);
};

const handlerListUsers: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    handlerGetUser(req, res);
  } else {
    res.status(404).json({ message: "Route not found!" });
  }
};

export default handlerListUsers;

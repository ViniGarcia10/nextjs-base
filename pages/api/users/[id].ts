import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlerGetUserID: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    api.getUserByID(parseInt(id as string), res);
  } catch (error) {
    res.status(500).json({ error: "Error in the response." });
  }
};

const handlerGetUserEmail: NextApiHandler = async (req, res) => {
  const { email } = req.query;
  try {
    api.getUserByEmail(email as string);
  } catch (error) {
    res.status(500).json({ error: "Error in the response." });
  }
};

const handlerPostUser: NextApiHandler = async (req, res) => {
  const { name, email } = req.body;

  try {
    api.postNewUser(name, email, res);
  } catch (error) {
    res.status(500).json({ error: "Error in the response." });
  }
};

const handlerDeleteUser: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    api.deleteUser(parseInt(id as string), res);
  } catch (error) {
    res.status(500).json({ error: "Error in the response." });
  }
};

const handlerPutUser: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { name, active, role } = req.body;

  try {
    api.putUser(parseInt(id as string), name, active, role, res);
  } catch (error) {
    res.status(500).json({ error: "Error in the response." });
  }
};

const handlerUsers: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      handlerGetUserID(req, res);
      break;

    case "POST":
      handlerPostUser(req, res);
      break;

    case "DELETE":
      handlerDeleteUser(req, res);
      break;

    case "PUT":
      handlerPutUser(req, res);
      break;

    default:
      res.status(404).json({ message: "Route not found!" });
      break;
  }
};

export default handlerUsers;

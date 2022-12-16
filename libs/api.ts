/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse } from "next";
import prisma from "./prisma";

//items per page PAGINATION
let take = 2;

//offset of items PAGINATION
let skip = 0;

export default {
  getAllUsers: async (
    page: number,
    order?: string,
    start?: string,
    itensOR?: []
  ) => {
    if (page) {
      skip = (page - 1) * take;
    }

    switch (order) {
      case "id":
        //list condicional id
        const handlerListUsersID = await prisma.user.findMany({
          skip,
          take,

          orderBy: {
            id: "asc",
          },
        });
        return handlerListUsersID;

      case "name":
        //list condicional name
        const handlerListUsersName = await prisma.user.findMany({
          skip,
          take,

          orderBy: {
            name: "asc",
          },
        });
        return handlerListUsersName;

      case "id-email":
        //list conditional of return this EMAIL and ID
        const handlerListUsersNameID = await prisma.user.findMany({
          skip,
          take,

          select: {
            id: true,
            email: true,
          },
        });

        return handlerListUsersNameID;

      case "start-string":
        //list conditional init name with "string"
        const handlerListUsersNameStart = await prisma.user.findMany({
          skip,
          take,

          where: {
            name: {
              startsWith: String(start),
            },
          },
        });

        return handlerListUsersNameStart;

      case "conditional-OR":
        //list conditional name with "array" OR
        const handlerListUsersConditional = await prisma.user.findMany({
          skip,
          take,

          where: {
            OR: itensOR,
          },
        });

        return handlerListUsersConditional;

      default:
        const handlerListUsers = await prisma.user.findMany({
          skip,
          take,
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        return handlerListUsers;
    }
  },

  getUserByID: async (id: number, res: NextApiResponse) => {
    const User = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (User) return res.status(200).json(User);

    return res.status(404).json({ error: "User not found!" });
  },

  getUserByEmail: async (email: string) => {
    const User = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (User) return User;

    return null;
  },

  postNewUser: async (name: string, email: string, res: NextApiResponse) => {
    const User = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (User) return res.status(404).json({ error: "User exists!" });

    let NameUpperCase = name.toUpperCase();

    await prisma.user.create({
      data: { name: NameUpperCase, email },
    });

    res.status(201).json({ message: "user added!" });
  },

  deleteUser: async (id: number, res: NextApiResponse) => {
    const User = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!User) return res.status(404).json({ error: "User no exists!" });

    await prisma.user.delete({
      where: {
        id: User.id,
      },
    });

    return res.json({ message: "user deleted!" });
  },

  putUser: async (
    id: number,
    name: string,
    active: boolean,
    role: string,
    res: NextApiResponse
  ) => {
    const User = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!User) return res.status(404).json({ error: "User no exists!" });

    if (!["USER", "ADMIN"].some((item) => item === role)) {
      return res.status(404).json({ error: "role inválid!" });
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...User,
        name,
        active: Boolean(active),
        role: role === "USER" ? "USER" : "ADMIN",
      },
    });

    return res.status(204).json({});
  },
};

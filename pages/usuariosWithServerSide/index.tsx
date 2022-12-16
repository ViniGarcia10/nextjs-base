import axios from "axios";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthUser } from "../../@types/AuthUser";
import { User } from "../../@types/User";
import { ButtonSubmit } from "../../components/Button";
import { Layout } from "../../components/layout";
import api from "../../libs/api";
import { authOptions } from "../api/auth/[...nextauth]";
import { Container } from "./styles";

type PropsUsers = {
  users: User[];
  loggedUser: AuthUser;
};

const ListUsers = ({ users, loggedUser }: PropsUsers) => {
  const [pageAccount, setPageAccount] = useState(1);
  const [endList, setEndList] = useState(false);
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listUsers.length == 0) {
      setListUsers(users);
    }
  }, [users, listUsers]);

  const handleNextPage = async () => {
    setPageAccount(pageAccount + 1);
    setLoading(true);

    try {
      const req = await axios.get(`/api/users?page=${pageAccount}`);
      const res = await req.data;

      if (res.length === 0) {
        setEndList(true);
      }

      setListUsers([...listUsers, ...res]);
    } catch (error) {
      alert("Ops!, erro ao buscar usuários.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <h1>Lista de Usuário de {loggedUser.name}</h1>
        <Link href={"/usuariosWithServerSide/NewUserServer"}>
          <ButtonSubmit
            title={"Novo Usuário"}
            onClick={handleNextPage}
          />
        </Link>
        <br />
        <small>página {pageAccount}</small>
        <ul>
          {listUsers.map((user, item) => (
            <li key={item}>{user.name}</li>
          ))}
        </ul>
        {!endList && (
          <ButtonSubmit
            title={"Próxima Página"}
            loading={loading}
            onClick={handleNextPage}
          />
        )}
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //verific user
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) return { redirect: { destination: "/", permanent: true } };

  const users = await api.getAllUsers(2);

  return {
    props: {
      loggedUser: session.user,
      users,
    },
  };
};

export default ListUsers;

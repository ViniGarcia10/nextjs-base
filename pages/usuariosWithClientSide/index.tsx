import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../../@types/User";
import { ButtonSubmit } from "../../components/Button";
import { Layout } from "../../components/layout";
import api from "../../libs/api";
import { Container } from "./styles";

type PropsUsers = {
  users: User[];
};

const ListUsers = ({ users }: PropsUsers) => {
  const { data: session, status: SessionStatus } = useSession();

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
        {SessionStatus === "loading" && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="spinner-border text-info " role="status"></div>
            <span className="">Carregando...</span>
          </div>
        )}
        {SessionStatus === "unauthenticated" && (
          <>
            <div className="container d-flex flex-column align-items-center alert alert-warning">
              <h3>Você não tem acesso a esse conteudo!</h3>
              <ButtonSubmit onClick={() => signIn()} title="Fazer Login" />
            </div>
          </>
        )}

        {SessionStatus === "authenticated" && (
          <>
            <h1>
              Lista de Usuário com <strong>{listUsers.length}</strong> pessoas
            </h1>
            <Link href={"/usuariosWithClientSide/newUserClient"}>
              <ButtonSubmit title="Novo Usuário" />
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
                title="Próxima Página"
                loading={loading}
                onClick={handleNextPage}
              />
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const users = await api.getAllUsers(2);

  return {
    props: {
      users,
    },
  };
};

export default ListUsers;

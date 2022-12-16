import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { ButtonSubmit } from "../../components/Button";
import { Layout } from "../../components/layout";
import { Container } from "./styles";

const NewUserClient = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!!!name || !!!email) {        
        alert("Preencha todos os campos!");
        return;
      }

      await axios
        .post(`/api/users/newUser`, {
          name,
          email,
        })
        .then(() => {
          alert(`Usuário "${name}" foi cadastrado com sucesso!`);
          router.push("/usuariosWithClientSide");
        })
        .catch(({ response }) => {
          if (response.data.error == "User exists!") {
            alert("Ops!, Usuário já existe!");
          }
        });
    } catch (error) {
      alert("Ops!, não foi possivel cadastrar o usuário " + name);
    }
  };

  return (
    <Layout>
      <Container>
        <form onSubmit={(e) => handleSubmitUser(e)} method="post">
          <fieldset>
            <legend>Novo Usuário</legend>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <ButtonSubmit title={"Cadastrar"} />
          </fieldset>
        </form>
      </Container>
    </Layout>
  );
};

export default NewUserClient;

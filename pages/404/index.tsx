import Link from "next/link";
import { ButtonSubmit } from "../../components/Button";
import { Container } from "./styles";

const Page404 = () => {
  return (
    <Container>
      <h1>Oops! Página não encontrada!</h1>
      <Link href={"/"} title="Página Inicial">
        <ButtonSubmit title={"Voltar a página inicial"} />
      </Link>
    </Container>
  );
};

export default Page404;

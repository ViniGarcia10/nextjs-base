import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { ButtonSubmit } from "../../components/Button";
import { Layout } from "../../components/layout";
import { Container } from "./styles";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasInfoError, setHasInfoError] = useState("");

  const handleSubmitUser = async (e: FormEvent<HTMLFormElement>) => {
    setHasError(false);
    e.preventDefault();

    try {
      if (!!!password || !!!email) {
        setHasError(true);
        setHasInfoError("Preencha todos os campos!");
        return;
      }

      setLoading(true);

      const request = await signIn("credentials", {
        redirect: false,
        email,
        password,
      }).finally(() => setLoading(false));

      if (request && request.error === null) {
        if (router?.query?.callbackUrl) {
          router.push(router.query.callbackUrl as string);
        } else {
          router.push("/");
        }
      } else {
        setHasInfoError("Usuário ou Senha inválidos!");
        setHasError(true);
      }
    } catch (error) {
      setHasInfoError("Ops! tente novamente.");
      setLoading(false);
    }
  };

  const handleLoginGithub = () => {
/*     try {
      setHasError(false);
      setLoading(true);
      window.location.href = `https://github.com/login/oauth/authorize?clien_id=${process.env.NEXT_PUBLIC_GITHUB_ID}`;
    } catch (error) {
      console.log("error", error);
      window.location.href = "http://localhost:3000";
    } finally {
      setLoading(false);
      setHasInfoError("Erro ao ingressar com o Github.");
      setHasError(true);
    } */
  };

  const handleLoginGoogle = () => {
/*     try {
      setHasError(false);
      setLoading(true);
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_ID}&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle`;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      setHasInfoError("Erro ao ingressar com o Google.");
      setHasError(true);
    } */
  };

  return (
    <Layout>
      <Container>
        <form onSubmit={(e) => handleSubmitUser(e)} method="post">
          <fieldset>
            <legend>Login</legend>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonSubmit loading={loading} title={"Login"} />
            <Link href={"/loginAPI"} title="Login API">
              <span className="text-red">Login API</span>
            </Link>

            <ButtonSubmit
              type="button"
              loading={loading}
              title={"Login Github"}
              onClick={handleLoginGithub}
            />
            <ButtonSubmit
              type="button"
              loading={loading}
              title={"Login Google"}
              onClick={handleLoginGoogle}
            />
            {hasError && (
              <>
                <div
                  className="mt-3 alert alert-warning d-flex align-items-center justify-content-center"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                    height={20}
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <div>{hasInfoError}</div>
                </div>
              </>
            )}
          </fieldset>
        </form>
      </Container>
    </Layout>
  );
};

export default Login;

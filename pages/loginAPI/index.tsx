import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { ButtonSubmit } from "../../components/Button";
import { Layout } from "../../components/layout";
import { Container } from "./styles";

const LoginAPI = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasInfoError, sethasInfoError] = useState("");

  const loginApi = async (email: string, password: string) => {
    const csrfReq = await axios.get(`/api/auth/csrf`);

    if (csrfReq.data?.csrfToken) {
      const authReq = await axios.post("/api/auth/callback/credentials", {
        json: true,
        csrfToken: csrfReq?.data?.csrfToken,
        email,
        password,
      });

      if (authReq.status === 200) {
        const userData = await axios.get("/api/auth/session");

        if (userData.data.user) {
          return true;
        }
      }
    }

    return false;
  };

  const handleSubmitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasError(false);

    try {
      if (!!!password || !!!email) {
        sethasInfoError("Preencha todos os campos!");
        return;
      }

      setLoading(true);
      const logged = await loginApi(email, password);
      setLoading(false);

      if (logged) {
        window.location.href = "/";
      } else {
        setHasError(true);
        sethasInfoError("Usuário ou Senha inválidos!");
      }
    } catch (error) {
      alert("Ops! tente novamente.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <form onSubmit={(e) => handleSubmitUser(e)} method="post">
          <fieldset>
            <legend>Login API</legend>
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

export default LoginAPI;

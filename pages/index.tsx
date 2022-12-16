/* eslint-disable @next/next/no-page-custom-font */
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { ButtonSubmit } from "../components/Button";
import { Layout } from "../components/layout";
import ImageGitHUb from "../public/card-github.png";
import HomeStyle from "../styles/Home.module.css";

const PageMain = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className={HomeStyle.HomeContainer}>
        <Head>
          <title>Vinixx Dev - Soluções Inteligentes</title>
          <meta name="title" content="Vinixx Dev - Soluções Inteligentes" />
          <meta
            name="description"
            content="A vinixx Dev é uma startup focada em soluções para diversos problemas  em sistemas do mercado!"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://metatags.io/" />
          <meta
            property="og:title"
            content="Vinixx Dev - Soluções Inteligentes"
          />
          <meta
            property="og:description"
            content="A vinixx Dev é uma startup focada em soluções para diversos problemas  em sistemas do mercado!"
          />
          <meta
            property="og:image"
            content="https://localhost:3000/card-github.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://metatags.io/" />
          <meta
            property="twitter:title"
            content="Vinixx Dev - Soluções Inteligentes"
          />
          <meta
            property="twitter:description"
            content="A vinixx Dev é uma startup focada em soluções para diversos problemas  em sistemas do mercado!"
          />
          <meta
            property="twitter:image"
            content="http://localhost:3000/card-github.png"
          />
        </Head>

        {(!session && (
          <>
            <h1>Realizar Login</h1>
            <ButtonSubmit onClick={() => signIn()} title={"Login"} />
          </>
        )) || (
          <>
            <h1>Bem vindo, {session?.user?.name}!</h1>
            <Image
              alt="Imagem GitHub"
              src={ImageGitHUb}
              priority={true}
              height={400}
              width={250}
              onClick={() => {
                window.open("http://localhost:3000/card-github.png/", "_blank");
              }}
            />

            <button className="btn btn-danger" onClick={() => signOut()}>
              Sair
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PageMain;

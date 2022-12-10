import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components/layout";
import ImageGitHUb from "../public/card-github.png";
import HomeStyle from "../styles/Home.module.css";

const PageMain = () => {
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

        <h1>Página inicial</h1>

        <Image
          alt="Imagem GitHub"
          src={ImageGitHUb}
          priority={false}
          height={400}
          width={250}     
          onClick={() => {
            window.open("http://localhost:3000/card-github.png/", "_blank");
          }}
        />

        <button className="btn btn-primary">Entrar</button>
      </div>
    </Layout>
  );
};

export default PageMain;

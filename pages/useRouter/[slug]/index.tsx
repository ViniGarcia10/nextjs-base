import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const useRoute: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <Head>
        <title>Vinixx Dev - Página do {slug}</title>
        <meta name="title" content={`Vinixx Dev - Página do ${slug}`} />
        <meta
          name="description"
          content="A vinixx Dev é uma startup focada em soluções para diversos problemas  em sistemas do mercado!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta
          property="og:title"
          content={`Vinixx Dev - Página do ${slug}`}
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
          content={`Vinixx Dev - Página do ${slug}`}
        />
        <meta
          property="twitter:description"
          content="A vinixx Dev é uma startup focada em soluções para diversos problemas  em sistemas do mercado!"
        />
        <meta
          property="twitter:image"
          content="https://localhost:3000/card-github.png"
        />
      </Head>

      <h1>Usando o Router, Página de {slug}</h1>
      <p>PathName: {router.pathname}</p>
      <p>isFallback: {router.isFallback.toString()}</p>

      <button
        onClick={() => {
          router.push("/useRouter/pedro");
        }}
      >
        Ir para a página do Pedro!
      </button>
    </div>
  );
};

export default useRoute;

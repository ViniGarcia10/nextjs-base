import { useRouter } from "next/router";
import React from "react";

const useRoute: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
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

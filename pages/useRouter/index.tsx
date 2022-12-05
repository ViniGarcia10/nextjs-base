import { useRouter } from "next/router";
import { useEffect } from "react";

const InitPageRoute = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(`Indo para ${url}`);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <div>
      <h1>Bem vindos a pagina Route</h1>
      <button
        onClick={() => {
          router.push("/useRouter/Vini");
        }}
      >
        Ir para a página do Vini!
      </button>
    </div>
  );
};

export default InitPageRoute;

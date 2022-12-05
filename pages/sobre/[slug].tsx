import { useRouter } from "next/router";

export default function SobreSlug() {
  const router = useRouter();
  const { slug } = router.query;

  return <div>Pagina com o SLUG: {slug}</div>;
}

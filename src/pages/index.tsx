import BgImage from "../assets/bg-image.svg";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <div
      className="flex flex-col flex-1"
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: "cover",
      }}
    >
      <Header />

      <Banner />
    </div>
  );
}

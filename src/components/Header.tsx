import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LogoS from "../assets/logo-tesla-1.svg";
import LogoB from "../assets/logo-tesla.svg";

export const Header = () => {
  return (
    <header className="container">
      <Head>
        <title>NextJS + TailwindCSS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" justify-center p-2 container max-w-5xl m-auto flex sm:justify-between items-center">
        <Image
          src={LogoB}
          alt="Logo Tesla"
          height={150}
          width={150}
          priority={false}
          className="p-2 hidden md:inline-block"
        />
        <Image
          src={LogoS}
          alt="Logo Tesla"
          height={50}
          width={50}
          priority={false}
          className="p-2 md:hidden"
        />

        <div className="p-3 hidden sm:flex sm:items-center  ">
          <Link className="" href="https://github.com" target="_blank">
            {" "}
            Github
          </Link>
          <Link href="https://instagram.com" target="_blank">
            {" "}
            instagram
          </Link>
          <Link href="https://youtube.com" target="_blank">
            {" "}
            youtube
          </Link>
        </div>
      </div>
    </header>
  );
};

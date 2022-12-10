import Link from "next/link";
import { useRouter } from "next/router";
import { NavigationLinks } from "../../utils/data";
import navBar from "./navBar.module.css";

export const NavBar = () => {
  const router = useRouter();

  const verifyActiveLink = (loopPath: string) => {
    if (loopPath === "/" && router.pathname !== "/") return null;

    if (router.pathname.indexOf(loopPath) === 0) {
      return navBar.linkItemActive;
    }

    return null;
  };

  return (
    <ul className={navBar.container}>
      {NavigationLinks.map((link, index) => (
        <li
          key={index}
          className={[navBar.linkItem, verifyActiveLink(link.path)].join(" ")}
        >
          <Link href={link.path}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

import { ReactElement } from "react";
import { NavBar } from "../Navbar";
import styles from "./Layout.module.css";

type PropsLayout = {
  children: ReactElement;
};

export const Layout = ({ children }: PropsLayout) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Meu Projeto</h1>
        <NavBar />
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <strong>Todos os direitos reservados</strong>
      </footer>
    </div>
  );
};

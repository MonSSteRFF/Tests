import React from "react";

import styles from "./assets/styles/App.module.scss";

import { Header } from "./components/Header/Header";
import { Aside } from "./components/Aside/Aside";
import { Table } from "./components/Table/Table";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.app__main}>
        <Aside />

        <Table />
      </main>
    </div>
  );
};

export { App };

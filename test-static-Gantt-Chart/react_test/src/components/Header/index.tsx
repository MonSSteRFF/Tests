import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { ExportButton } from "../../ui-components/ExportButton";

import styles from "./Header.module.scss";

const Header = () => {
  const { table } = useAppSelector((state) => state.tableReducer);

  const exportFile = () => {
    const tableUrl = URL.createObjectURL(new Blob([JSON.stringify(table)]));
    const link = document.createElement("a");

    link.download = "table.json";
    link.href = tableUrl;
    link.click();
  };

  return (
    <header className={styles.header}>
      <h1>
        {table.project} / {table.period}
      </h1>

      <ExportButton onClick={exportFile}>{"Export"}</ExportButton>
    </header>
  );
};

export { Header };

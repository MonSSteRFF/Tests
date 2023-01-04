import React, { FC } from "react";

import styles from "./ExportButton.module.scss";

const ExportButton: FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export { ExportButton };

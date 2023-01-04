import React, { FC } from "react";
import { DateList } from "./DateList";

import styles from "./Table.module.scss";
import { Task } from "./Task";
import { useAppSelector } from "../../hooks/redux";

const Table: FC = () => {
  const { chart } = useAppSelector((state) => state.tableReducer.table);

  return (
    <div className={styles.mainTable}>
      <aside className={styles.asideTable}>
        <div className={styles.asideTable__title}>{"Work item"}</div>
        <div className={styles.task} />

        {chart !== undefined ? <Task sub={[chart]} /> : null}
      </aside>
      <DateList />
    </div>
  );
};

export { Table };

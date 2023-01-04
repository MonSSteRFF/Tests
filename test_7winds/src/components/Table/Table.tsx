import React, { FC, useEffect } from "react";

import styles from "./Table.module.scss";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createRowInList,
  fetchNewList,
} from "../../store/reducers/actionCreators";

import { TableRow } from "./TableRow";

const Table: FC = () => {
  const { list } = useAppSelector((state) => state.listReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNewList());
  }, [dispatch]);

  return (
    <div className={styles.table}>
      <div className={styles.table__mainRow}>
        {[
          "Уровень",
          "Наименование работ",
          "Основная з/п",
          "Оборудование",
          "Накладные расходы",
          "Сметная прибыль",
        ].map((thName, index) => (
          <p key={index} className={styles.table__mainRow__text}>
            {thName}
          </p>
        ))}
      </div>

      {list.length === 0 ? (
        <>
          {"Пока в таблице нет ничего, нажмите"}

          <button
            onClick={() => dispatch(createRowInList(null))}
            className={styles.table__createFirstBtn}
          >
            {"Создать"}
          </button>
        </>
      ) : null}

      {list.map((row) => (
        <TableRow key={row.id} lvl={0} row={row} parentId={row.id} />
      ))}
    </div>
  );
};

export { Table };

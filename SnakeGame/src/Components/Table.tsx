import React, { useEffect, useState } from 'react';

import useGame from '../Store/useGame';
import styles from './Table.module.scss';
import TableItem from './TableItem';

const Table = () => {
  const table = useGame((store) => store.table);
  const initSnake = useGame((store) => store.initSnake);
  const next = useGame((store) => store.next);
  const difficultySpeed = useGame((store) => store.difficultySpeed);
  const createApple = useGame((store) => store.createApple);

  useEffect(() => {
    initSnake();
    const tick = setInterval(() => {
      next();
      initSnake();
      createApple();
    }, 1000 / difficultySpeed);

    return () => clearInterval(tick);
  }, [difficultySpeed]);

  return (
    <div className={styles.table}>
      {table.map((tableRow, rowIndex) => (
        <div key={rowIndex} className={styles.tableRow}>
          {tableRow.map((tableItem, itemIndex) => (
            <TableItem key={rowIndex + '' + itemIndex} tableItem={tableItem} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;

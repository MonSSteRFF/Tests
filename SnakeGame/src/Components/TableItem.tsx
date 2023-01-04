import React, { useMemo } from 'react';

import { I_TableItem } from '../types';
import DirectionEyes from './DirectionEyes';
import styles from './Table.module.scss';

const TableItem: React.FC<{
  tableItem: I_TableItem;
}> = ({ tableItem }) => {
  return useMemo(
    () => (
      <div className={styles.tableItem}>
        {tableItem.isSnake ? (
          <span className={styles.snake}>
            <DirectionEyes direction={tableItem.direction} head={tableItem.isHead} />
          </span>
        ) : tableItem.isApple ? (
          <span className={styles.apple} />
        ) : null}
      </div>
    ),
    [tableItem],
  );
};

export default TableItem;

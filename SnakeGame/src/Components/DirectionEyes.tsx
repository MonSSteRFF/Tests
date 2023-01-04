import React from 'react';

import { E_Dir } from '../types';
import styles from './Table.module.scss';

const DirectionEyes: React.FC<{
  direction: E_Dir | undefined;
  head: boolean;
}> = ({ direction, head }) => {
  if (direction === undefined) {
    return null;
  }

  switch (direction) {
    case E_Dir['x+']: {
      return head ? (
        <span className={`${styles.eyes} ${styles.eyes_right}`} />
      ) : (
        <span className={styles.arrow}>▶</span>
      );
    }
    case E_Dir['x-']: {
      return head ? (
        <span className={`${styles.eyes} ${styles.eyes_left}`} />
      ) : (
        <span className={styles.arrow}>◀</span>
      );
    }
    case E_Dir['y-']: {
      return head ? (
        <span className={`${styles.eyes} ${styles.eyes_top}`} />
      ) : (
        <span className={styles.arrow}>▲</span>
      );
    }
    case E_Dir['y+']: {
      return head ? (
        <span className={`${styles.eyes} ${styles.eyes_bottom}`} />
      ) : (
        <span className={styles.arrow}>▼</span>
      );
    }
  }
};

export default DirectionEyes;

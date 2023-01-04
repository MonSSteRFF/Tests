import React from 'react';

import useGame from '../Store/useGame';
import { E_Dir } from '../types';
import styles from './KeyBoard.module.scss';

const KeyBoard = () => {
  const changeDirection = useGame((store) => store.changeDirection);
  const initSnake = useGame((store) => store.initSnake);

  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'ArrowUp': {
        changeDir(E_Dir['y-']);
        break;
      }
      case 'ArrowDown': {
        changeDir(E_Dir['y+']);
        break;
      }
      case 'ArrowLeft': {
        changeDir(E_Dir['x-']);
        break;
      }
      case 'ArrowRight': {
        changeDir(E_Dir['x+']);
        break;
      }
    }
  });

  const changeDir = (dir: E_Dir) => {
    changeDirection(dir);
    initSnake();
  };

  return (
    <div className={styles.board}>
      <button className={styles.key} onClick={() => changeDir(E_Dir['y-'])}>
        up
      </button>
      <div className={styles.board_box}>
        <button className={styles.key} onClick={() => changeDir(E_Dir['x-'])}>
          left
        </button>
        <button className={styles.key} onClick={() => changeDir(E_Dir['y+'])}>
          down
        </button>
        <button className={styles.key} onClick={() => changeDir(E_Dir['x+'])}>
          right
        </button>
      </div>
    </div>
  );
};

export default KeyBoard;

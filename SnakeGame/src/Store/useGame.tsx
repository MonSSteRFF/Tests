import create from 'zustand';

import {
  appleMaxCount,
  difficulty,
  snakeLengthDef,
  tableHeight,
  tableWidth,
} from '../gameConfig.json';
import { E_Dir, I_Snake, I_SnakeItem, I_Table, I_TableItem } from '../types';
import game from './useGame.module';

interface I_useGame {
  table: I_Table;
  snake: I_Snake;
  appleCount: number;
  difficultySpeed: number;
  initSnake: () => void;
  next: () => void;
  changeDirection: (direction: E_Dir) => void;
  createApple: () => void;
  changeDifficulty: (speed: number) => void;
}

const useGame = create<I_useGame>((set) => ({
  table: game.createTable(tableWidth, tableHeight),
  snake: game.createSnake(
    snakeLengthDef,
    tableHeight / 2,
    tableWidth / 2 - snakeLengthDef,
  ),
  appleCount: 0,
  difficultySpeed: difficulty[0].speed,
  initSnake: () =>
    set((store) => {
      const table: I_Table = Object.assign([], store.table);
      const snake: I_Snake = Object.assign([], store.snake);

      const newTable = table.map((tableRows, tableY) => {
        return tableRows.map((tableItem, tableX) => {
          const table_snake: Array<I_SnakeItem> = snake.filter(
            (snakeItem) => snakeItem.x === tableX && snakeItem.y === tableY,
          );
          if (table_snake.length === 1) {
            return {
              isSnake: true,
              isApple: false,
              isWall: false,
              isHead: table_snake[0].isHead,
              direction: table_snake[0].direction,
            };
          } else {
            return {
              isSnake: false,
              isApple: tableItem.isApple,
              isHead: false,
              isWall: false,
            };
          }
        });
      });

      return { table: newTable };
    }),
  next: () =>
    set((store) => {
      const snake: I_Snake = Object.assign([], store.snake);
      const headItem = snake[snake.length - 1];
      const direction = headItem.direction;

      const { nextBlock, nextX, nextY } = game.getNextBlock(
        headItem.x,
        headItem.y,
        direction,
        store.table,
        tableHeight,
        tableWidth,
      );

      const newSnake: I_Snake = [];
      let appleCount = store.appleCount;

      const updateSnakePosition = () => {
        snake.forEach((snakeItem, index) => {
          if (index !== 0) {
            snakeItem.isHead = false;
            newSnake.push(snakeItem);
          }
        });

        newSnake.push({
          isHead: true,
          direction: direction,
          x: nextX,
          y: nextY,
        });
      };

      if (!nextBlock.isApple && !nextBlock.isWall && !nextBlock.isSnake) {
        updateSnakePosition();
      }

      if (nextBlock.isApple) {
        snake.forEach((snakeItem) => {
          snakeItem.isHead = false;
          newSnake.push(snakeItem);
        });
        newSnake.push({
          isHead: true,
          direction: direction,
          x: nextX,
          y: nextY,
        });
        appleCount = appleCount - 1;
      }

      if (nextBlock.isSnake || nextBlock.isWall) {
        if (nextBlock.isSnake) {
          if (nextX === snake[0].x && nextY === snake[0].y) {
            updateSnakePosition();
            return { snake: newSnake };
          }
        }

        const _table = game.createTable(tableWidth, tableHeight);
        const _snake = game.createSnake(
          snakeLengthDef,
          tableHeight / 2,
          tableWidth / 2 - snakeLengthDef,
        );
        return { table: _table, snake: _snake, appleCount: 0 };
      }

      return { snake: newSnake, appleCount: appleCount };
    }),
  changeDirection: (direction: E_Dir) =>
    set((store) => {
      const snake: I_Snake = Object.assign([], store.snake);

      const newSnake = snake.map((snakeItem) => {
        if (snakeItem.isHead) {
          const { nextBlock } = game.getNextBlock(
            snakeItem.x,
            snakeItem.y,
            direction,
            store.table,
            tableHeight,
            tableWidth,
          );

          if (nextBlock.isSnake) {
            return snakeItem;
          }

          return {
            isHead: snakeItem.isHead,
            direction: direction,
            x: snakeItem.x,
            y: snakeItem.y,
          };
        } else {
          return snakeItem;
        }
      });

      return { snake: newSnake };
    }),
  createApple: () =>
    set((store) => {
      if (store.appleCount < appleMaxCount) {
        const table = Object.assign([], store.table);

        const { x, y } = game.addApple(
          game.random(0, tableWidth),
          game.random(0, tableHeight),
          tableWidth,
          tableHeight,
          table,
        );

        const newTable = store.table.map((tableRow, y_index) =>
          tableRow.map((tableItem, x_index) => {
            if (x_index === x && y_index === y) {
              return {
                isSnake: false,
                isApple: true,
                isHead: false,
                isWall: false,
              };
            }
            return tableItem;
          }),
        );

        return { table: newTable, appleCount: store.appleCount + 1 };
      }
      return store;
    }),
  changeDifficulty: (speed) =>
    set((store) => {
      return { difficultySpeed: speed };
    }),
}));

export default useGame;

import { E_Dir, I_Snake, I_Table, I_TableItem, I_TableRows } from '../types';

const createTable = (width: number, height: number) => {
  const _table: I_Table = [];
  const _tableRows: I_TableRows = [];

  for (let i = 0; i < width; i++) {
    _tableRows.push({
      isSnake: false,
      isApple: false,
      isHead: false,
      isWall: false,
    });
  }

  for (let i = 0; i < height; i++) {
    _table.push(_tableRows);
  }

  return _table;
};

const createSnake = (snakeLengthDef: number, initHeight: number, initWidth: number) => {
  const _Snake: I_Snake = [];

  for (let i = 1; i <= snakeLengthDef; i++) {
    _Snake.push({
      isHead: i === snakeLengthDef,
      direction: E_Dir['x+'],
      x: initWidth + i,
      y: initHeight,
    });
  }

  return _Snake;
};

const getNextBlock = (
  currentX: number,
  currentY: number,
  direction: E_Dir,
  table: I_Table,
  tableHeight: number,
  tableWidth: number,
) => {
  let nextX: number, nextY: number;

  switch (direction) {
    case E_Dir['x+']: {
      nextX = currentX + 1 > tableWidth - 1 ? 0 : currentX + 1;
      nextY = currentY;
      break;
    }
    case E_Dir['x-']: {
      nextX = currentX - 1 < 0 ? tableWidth - 1 : currentX - 1;
      nextY = currentY;
      break;
    }
    case E_Dir['y+']: {
      nextX = currentX;
      nextY = currentY + 1 > tableHeight - 1 ? 0 : currentY + 1;
      break;
    }
    case E_Dir['y-']: {
      nextX = currentX;
      nextY = currentY - 1 < 0 ? tableHeight - 1 : currentY - 1;
      break;
    }
  }

  return { nextBlock: table[nextY][nextX], nextX, nextY };
};

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

type T_AddApple = (
  rx: number,
  ry: number,
  tableWidth: number,
  tableHeight: number,
  table: I_Table,
) => { x: number; y: number };

const addApple: T_AddApple = (rx, ry, tableWidth, tableHeight, table) => {
  const tableItem: I_TableItem = table[ry][rx];

  if (tableItem.isSnake || tableItem.isWall) {
    return addApple(
      random(0, tableWidth),
      random(0, tableHeight),
      tableWidth,
      tableHeight,
      table,
    );
  }

  return { x: rx, y: ry };
};

export default { createTable, createSnake, getNextBlock, random, addApple };

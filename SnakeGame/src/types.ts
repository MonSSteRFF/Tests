enum E_Dir {
  'x+' = 'x+',
  'x-' = 'x-',
  'y+' = 'y+',
  'y-' = 'y-',
}

interface I_SnakeItem {
  isHead: boolean;
  direction: E_Dir;
  x: number;
  y: number;
}

type I_Snake = Array<I_SnakeItem>;

interface I_TableItem {
  isSnake: boolean;
  isApple: boolean;
  isHead: boolean;
  isWall: boolean;
  direction?: E_Dir;
}

type I_TableRows = Array<I_TableItem>;

type I_Table = Array<I_TableRows>;

export type { I_Snake, I_SnakeItem, I_Table, I_TableItem, I_TableRows };
export { E_Dir };

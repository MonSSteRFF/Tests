import { changedRows, I_row } from "../../types";


interface IListState {
  list: I_row[];
  isLoading: boolean;
  error: string;
  editorId: number;
}

type T_deleteRowModule = (
  newList: I_row[],
  rID: number,
  newRows: changedRows
) => I_row[];

type T_createRowModule = (
  newList: I_row[],
  parentId: number | null,
  newRows: changedRows
) => I_row[];

type T_updateRowModule = (newList: I_row[], newRows: changedRows) => I_row[];

export type { T_deleteRowModule, T_createRowModule, T_updateRowModule, IListState };

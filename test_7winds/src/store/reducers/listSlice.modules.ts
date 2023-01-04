import {
  T_createRowModule,
  T_deleteRowModule,
  T_updateRowModule,
} from "./listSlice.types";
import { I_row } from "../../types";

const deleteRowModule: T_deleteRowModule = (newList, rID, newRows) => {
  const deleteFunc: (newList: I_row[], rID: number) => I_row[] = (
    newList,
    rID
  ) => {
    const sortedList: I_row[] = newList.filter((item) => item.id !== rID);

    return sortedList.map((item) => {
      if (item.child.length === 0) {
        return item;
      } else {
        const newItem = item;
        newItem.child = deleteFunc(item.child, rID);
        return newItem;
      }
    });
  };

  return updateRowModule(deleteFunc(newList, rID), newRows);
};

const createRowModule: T_createRowModule = (newList, parentId, newRows) => {
  const addRowFunc: (
    newList: I_row[],
    parentId: number | null,
    row: I_row
  ) => I_row[] = (newList, parentId, row) => {
    if (parentId === null) {
      const list = newList;
      row.child = [];
      list.push(row);
      return list;
    }

    return newList.map((item) => {
      if (item.id === parentId) {
        const newItem = item;
        row.child = [];
        newItem.child.push(row);
        return newItem;
      } else {
        if (item.child.length === 0) {
          return item;
        } else {
          const newItem = item;
          const child = addRowFunc(item.child, parentId, row);
          newItem.child = child === undefined ? [] : child;
          return newItem;
        }
      }
    });
  };

  return updateRowModule(
    addRowFunc(newList, parentId, newRows.current),
    newRows
  );
};

const updateRowModule: T_updateRowModule = (newList, newRows) => {
  const changedRows = [newRows.current, ...newRows.changed];

  const changeRowFunc: (item: I_row) => I_row = (item) => {
    let newItem = undefined;

    if (changedRows.length === 0) {
      newItem = item;
    } else {
      changedRows.forEach((row) => {
        if (row === null) {
          newItem = item;
        } else {
          newItem = row.id === item.id ? row : item;
        }
      });
    }

    return newItem !== undefined ? newItem : item;
  };

  const replacer: (newList: I_row[]) => I_row[] = (newList) => {
    return newList.map((item) => {
      if (item.child.length === 0) {
        return changeRowFunc(item);
      } else {
        const newItem = changeRowFunc(item);
        newItem.child = replacer(item.child);
        return newItem;
      }
    });
  };

  return replacer(newList);
};

export { deleteRowModule, createRowModule, updateRowModule };

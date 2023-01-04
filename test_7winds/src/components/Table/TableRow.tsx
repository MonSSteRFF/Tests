import React, { FC } from "react";

import { I_row } from "../../types";

import styles from "./Table.module.scss";

import icon_blueDir from "../../assets/icons/blueDir.svg";
import icon_greenDir from "../../assets/icons/greenDir.svg";
import icon_file from "../../assets/icons/file.svg";
import icon_trashCan from "../../assets/icons/trashCan.svg";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeEditorId } from "../../store/reducers/listSlice";

import { useInput } from "../../hooks/useInput";
import {
  createRowInList,
  deleteRowInList,
  updateRowInList,
} from "../../store/reducers/actionCreators";

interface TableRowProps {
  lvl: number;
  row: I_row;
  parentId: number;
}

const TableRow: FC<TableRowProps> = ({ lvl, row, parentId }) => {
  const { editorId } = useAppSelector((state) => state.listReducer);
  const dispatch = useAppDispatch();

  const rowName = useInput(row.rowName);
  const salary = useInput(String(row.salary));
  const equipmentCosts = useInput(String(row.equipmentCosts));
  const overheads = useInput(String(row.overheads));
  const estimatedProfit = useInput(String(row.estimatedProfit));

  const createHandler = (id?: number) => {
    dispatch(createRowInList(id !== undefined ? id : null));
  };
  const deleteHandler = (id: number) => {
    dispatch(deleteRowInList(id));
  };
  const changeEditorRowHandler = (id: number) => {
    dispatch(changeEditorId(id));
  };

  const sendInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        rowName.value !== "" &&
        salary.value !== "" &&
        equipmentCosts.value !== "" &&
        overheads.value !== "" &&
        estimatedProfit.value !== ""
      ) {
        dispatch(changeEditorId(0));

        const updatedRow: I_row = {
          equipmentCosts: Number(equipmentCosts.value),
          estimatedProfit: Number(estimatedProfit.value),
          id: row.id,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: Number(overheads.value),
          rowName: rowName.value,
          salary: Number(salary.value),
          supportCosts: 0,
          total: 0,
          child: row.child,
        };

        dispatch(updateRowInList(row.id, updatedRow));
      }
    }
  };

  const RowLines = [
    { input: rowName, type: "string" },
    { input: salary, type: "number" },
    { input: equipmentCosts, type: "number" },
    { input: overheads, type: "number" },
    { input: estimatedProfit, type: "number" },
  ];
  const RowImages = [
    { icon: icon_blueDir, onClick: () => createHandler(undefined) },
    { icon: icon_greenDir, onClick: () => createHandler(row.id) },
    { icon: icon_file, onClick: () => createHandler(row.id) },
    { icon: icon_trashCan, onClick: () => deleteHandler(row.id) },
  ];
  const currentIsEdit = editorId === row.id;

  let iLineHeight = row.child.length - 1;
  row.child.forEach((rowItem, index) => {
    if (row.child.length !== index + 1) {
      iLineHeight = iLineHeight + rowItem.child.length;
    }
  });

  return (
    <>
      <div
        className={styles.table__row}
        onDoubleClick={() => changeEditorRowHandler(row.id)}
      >
        <p
          className={styles.table__row__p}
          style={{
            paddingLeft: `${lvl === 0 ? "12" : `${lvl * 20 + 12}`}px`,
            position: "relative",
          }}
        >
          <span className={styles.iconsBlock}>
            {RowImages.map((image, index) => {
              if (lvl > index) {
                return null;
              } else {
                return (
                  <React.Fragment key={parentId + index + lvl}>
                    <img
                      style={{
                        cursor: `${
                          (lvl === 2 && index === 2) ||
                          (lvl === 1 && index === 1) ||
                          (lvl === 0 && index === 2)
                            ? "default"
                            : "pointer"
                        }`,
                      }}
                      className={styles.iconsBlock__icon}
                      src={image.icon}
                      alt=""
                      onClick={
                        (lvl === 2 && index === 2) ||
                        (lvl === 1 && index === 1) ||
                        (lvl === 0 && index === 2)
                          ? () => ""
                          : image.onClick
                      }
                    />
                  </React.Fragment>
                );
              }
            })}
          </span>
          {lvl === 0 ? null : (
            <span
              className={styles.gLine}
              style={{ left: `${lvl * 20 + 4}px` }}
            />
          )}
          {lvl !== 0 || row.child.length === 0 ? null : (
            <span
              className={styles.iLine}
              style={{
                height: `${iLineHeight * 62}px`,
              }}
            />
          )}
        </p>

        {RowLines.map(
          (rowItem, index): JSX.Element => (
            <p className={styles.table__row__p} key={index}>
              {currentIsEdit ? (
                <input
                  className={styles.table__row__p__input}
                  type="text"
                  value={rowItem.input.value}
                  onChange={rowItem.input.onChange}
                  onKeyDown={sendInputHandler}
                />
              ) : rowItem.type === "number" ? (
                rowItem.input.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              ) : (
                rowItem.input.value
              )}
            </p>
          )
        )}
      </div>

      {row.child.map((childRow, index) => (
        <TableRow key={index} row={childRow} lvl={lvl + 1} parentId={row.id} />
      ))}
    </>
  );
};

export { TableRow };

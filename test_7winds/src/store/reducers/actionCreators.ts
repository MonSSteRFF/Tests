import { AppDispatch } from "../store";
import axios from "axios";
import {
  startLoading,
  errorLoading,
  newListFetchSuccess,
  deleteRow,
  createRow,
  updateRow,
} from "./listSlice";
import { I_row } from "../../types";

const apiLink = "http://185.244.172.108:8081";
const eID = "30188";

const fetchNewList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.get<I_row[]>(
      `${apiLink}/v1/outlay-rows/entity/${eID}/row/list`
    );

    dispatch(newListFetchSuccess(response.data));
  } catch (error: any) {
    dispatch(errorLoading(error.message));
  }
};

const deleteRowInList = (rID: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.delete(
      `${apiLink}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`
    );

    dispatch(deleteRow({ rID: rID, newRows: response.data }));
  } catch (error: any) {
    dispatch(errorLoading(error.message));
  }
};

const createRowInList =
  (parentId: number | null) => async (dispatch: AppDispatch) => {
    try {
      dispatch(startLoading());

      const simpleObject = {
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId: parentId,
        rowName: "string",
        salary: 0,
        supportCosts: 0,
      };

      const response = await axios.post(
        `${apiLink}/v1/outlay-rows/entity/${eID}/row/create`,
        simpleObject
      );

      dispatch(createRow({ parentId: parentId, newRows: response.data }));
    } catch (error: any) {
      dispatch(errorLoading(error.message));
    }
  };

const updateRowInList =
  (rID: number, newRow: I_row) => async (dispatch: AppDispatch) => {
    try {
      dispatch(startLoading());

      const response = await axios.post(
        `${apiLink}/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
        newRow
      );

      dispatch(
        updateRow({
          changed: [...response.data.changed, newRow],
          current: response.data.current,
        })
      );
    } catch (error: any) {
      dispatch(errorLoading(error.message));
    }
  };

export { fetchNewList, deleteRowInList, createRowInList, updateRowInList };

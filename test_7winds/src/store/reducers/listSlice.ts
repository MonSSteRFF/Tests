import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListState } from "./listSlice.types";
import { changedRows, I_row } from "../../types";

import {
  createRowModule,
  deleteRowModule,
  updateRowModule,
} from "./listSlice.modules";

const initialState: IListState = {
  list: [],
  isLoading: false,
  error: "",
  editorId: 0,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    errorLoading(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    newListFetchSuccess(state, action: PayloadAction<I_row[]>) {
      state.error = "";
      state.list = action.payload;
      state.isLoading = false;
    },
    changeEditorId(state, action: PayloadAction<number>) {
      state.editorId = action.payload;
    },
    deleteRow(
      state,
      action: PayloadAction<{ rID: number; newRows: changedRows }>
    ) {
      state.list = deleteRowModule(
        JSON.parse(JSON.stringify(state.list)),
        action.payload.rID,
        action.payload.newRows
      );

      state.isLoading = false;
    },
    createRow(
      state,
      action: PayloadAction<{ parentId: number | null; newRows: changedRows }>
    ) {
      state.list = createRowModule(
        JSON.parse(JSON.stringify(state.list)),
        action.payload.parentId,
        action.payload.newRows
      );

      state.isLoading = false;
    },
    updateRow(state, action: PayloadAction<changedRows>) {
      state.list = updateRowModule(
        JSON.parse(JSON.stringify(state.list)),
        action.payload
      );

      state.isLoading = false;
    },
  },
});

export const {
  startLoading,
  errorLoading,
  newListFetchSuccess,
  changeEditorId,
  deleteRow,
  createRow,
  updateRow,
} = listSlice.actions;

export default listSlice.reducer;

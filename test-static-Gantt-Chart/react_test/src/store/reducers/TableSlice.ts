import { Itable } from "../../models/ITable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Isub } from "../../models/ISub";

interface ITableState {
  table: Itable;
  isLoading: boolean;
  error: string;
}

const initialState: ITableState = {
  table: {
    project: "",
    period: "",
  },
  isLoading: false,
  error: "",
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    tableFetching(state) {
      state.isLoading = true;
    },
    tableFetchingSuccess(state, action: PayloadAction<Itable>) {
      state.isLoading = false;
      state.error = "";

      const table = action.payload;

      const openClose = (sub: Isub[]) => {
        sub.forEach((item) => {
          item.opened = true;
          if (item.sub !== undefined) openClose(item.sub);
        });
      };
      if (table.chart !== undefined) {
        openClose([table.chart]);
      }

      state.table = table;
    },
    tableFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    subOpenClose(
      state,
      action: PayloadAction<{ openClose: boolean; id: number }>
    ) {
      const table = state.table;

      const openClose = (sub: Isub[]) => {
        sub.forEach((item) => {
          if (item.id === action.payload.id) {
            item.opened = action.payload.openClose;
          }
          if (item.sub !== undefined) {
            openClose(item.sub);
          }
        });
      };
      if (table.chart !== undefined) {
        openClose([table.chart]);
      }

      state.table = table;
    },
  },
});

export const { subOpenClose } = tableSlice.actions;

export default tableSlice.reducer;

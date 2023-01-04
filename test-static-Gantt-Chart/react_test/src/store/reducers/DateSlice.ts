import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IColumnsDate } from "../../models/IColumnsDate";
import { Isub } from "../../models/ISub";
import { getMinMonday } from "../DateLogic/getMinMonday";
import { getDateColumns } from "../DateLogic/getDateColumns";

interface DateState {
  columns: IColumnsDate[];
  startDayTime: number;
}

const initialState: DateState = {
  columns: [],
  startDayTime: 0,
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    datesCreate(state, action: PayloadAction<Isub>) {
      const startMonday = getMinMonday(action.payload);

      if (startMonday.getDate() !== new Date(Date.now()).getDate()) {
        state.columns = getDateColumns(startMonday, 12);
        state.startDayTime = startMonday.getTime();
      }
    },
  },
});

export const { datesCreate } = dateSlice.actions;

export default dateSlice.reducer;

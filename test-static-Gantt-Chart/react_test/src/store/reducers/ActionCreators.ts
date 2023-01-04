import { AppDispatch } from "../store";
import axios from "axios";
import { Itable } from "../../models/ITable";
import { tableSlice } from "./TableSlice";

export const fetchTable = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(tableSlice.actions.tableFetching());
    const response = await axios.get<Itable>(
      "http://82.202.204.94/tmp/test.php"
    );
    dispatch(tableSlice.actions.tableFetchingSuccess(response.data));
  } catch (error: any) {
    dispatch(tableSlice.actions.tableFetchingError(error.message));
  }
};

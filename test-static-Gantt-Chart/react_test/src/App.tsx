import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchTable } from "./store/reducers/ActionCreators";
import { datesCreate } from "./store/reducers/DateSlice";

import "./App.scss";

import { Header } from "./components/Header";
import { Table } from "./components/Table/Table";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, table } = useAppSelector(
    (state) => state.tableReducer
  );

  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);
  useEffect(() => {
    if (table.chart !== undefined) {
      dispatch(datesCreate(table.chart));
    }
  }, [table.chart, dispatch]);

  return (
    <>
      <Header />
      <main>
        {isLoading && <h1>Идёт загрузка...</h1>}
        {error && <h1>{error}</h1>}

        <Table />
      </main>
    </>
  );
};

export { App };

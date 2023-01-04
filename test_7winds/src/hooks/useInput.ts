import React, { useState } from "react";

type T_onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;

type T_useInput = (initialState?: string) => {
  value: string;
  onChange: T_onChangeEvent;
};

const useInput: T_useInput = (initialState) => {
  const [value, setValue] = useState<string>(
    initialState !== undefined ? initialState : ""
  );

  const changeHandler: T_onChangeEvent = (e) => {
    setValue(e.target.value);
  };

  return { value: value, onChange: changeHandler };
};

export { useInput };

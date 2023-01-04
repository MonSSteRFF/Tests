import React from "react";
import RimParser from "../modules/RimParser";

interface ButtonsKeyboardProps {
  operation: string;
  saveInput: string;
  input: string;
  setSaveInput: React.Dispatch<React.SetStateAction<string>>;
  setOperation: React.Dispatch<React.SetStateAction<string>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const operators = ["+", "-", "/", "*"];

const ButtonsKeyboard: React.FC<ButtonsKeyboardProps> = ({
  operation,
  saveInput,
  setSaveInput,
  input,
  setInput,
  setOperation,
}) => {
  const operator = (op: string) => {
    if (saveInput === "") {
      setSaveInput(input);
    }
    setInput("");
    setOperation(op);
  };

  const result = () => {
    if (operation !== "") {
      switch (operation) {
        case "+":
          setSaveInput(
            RimParser.IntToRim(
              RimParser.RimToInt(saveInput) + RimParser.RimToInt(input)
            )
          );
          break;
        case "-":
          setSaveInput(
            RimParser.IntToRim(
              RimParser.RimToInt(saveInput) - RimParser.RimToInt(input)
            )
          );
          break;
        case "/":
          setSaveInput(
            RimParser.IntToRim(
              RimParser.RimToInt(saveInput) / RimParser.RimToInt(input)
            )
          );
          break;
        case "*":
          setSaveInput(
            RimParser.IntToRim(
              RimParser.RimToInt(saveInput) * RimParser.RimToInt(input)
            )
          );
          break;
      }
      setInput("");
      setOperation("");
    }
  };

  const clear = () => {
    setSaveInput("");
    setInput("");
    setOperation("");
  };

  return (
    <>
      <div>
        {operators.map((op, index) => (
          <button
            key={index}
            onClick={() => {
              operator(op);
            }}
          >
            {op}
          </button>
        ))}
      </div>
      <button onClick={result}>=</button>
      <button onClick={clear}>C</button>
    </>
  );
};

export default ButtonsKeyboard;

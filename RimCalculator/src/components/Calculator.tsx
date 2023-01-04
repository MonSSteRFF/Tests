import React, { useState } from "react";
import RimKeyboard from "./RimKeyboard";
import ButtonsKeyboard from "./ButtonsKeyboard";

const Calculator = () => {
  const [saveInput, setSaveInput] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [operation, setOperation] = useState<string>("");

  return (
    <div>
      <p>result: {saveInput}</p>
      <label style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <span>{operation}</span>
      </label>

      <RimKeyboard input={input} setInput={setInput} />

      <ButtonsKeyboard
        operation={operation}
        saveInput={saveInput}
        setSaveInput={setSaveInput}
        input={input}
        setInput={setInput}
        setOperation={setOperation}
      />
    </div>
  );
};

export default Calculator;

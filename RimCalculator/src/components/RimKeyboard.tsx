import React from "react";
import { digits } from "../modules/RimParser";

interface RimKeyboardProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const RimKeyboard: React.FC<RimKeyboardProps> = ({ input, setInput }) => {
  return (
    <div>
      {Object.keys(digits).map((digit, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setInput(input + digit);
            }}
          >
            {digit}
          </button>
        );
      })}
    </div>
  );
};

export default RimKeyboard;

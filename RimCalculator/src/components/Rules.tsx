import React from "react";

const listOfRules = [
  "The value of the symbol is added to itself, as many times as it is repeated. (Eg. II – 2, XX – 20 and XXX – 30).",
  "A symbol can be repeated only for three times, for example XXX = 30, CC = 200, etc.",
  "Symbols V, L, and D are never repeated.",
  "When a symbol of smaller value appears after a symbol of greater value, its values will be added. For Example-  VI = V + I = 5 + 1 = 6.",
  "When a symbol of a smaller value appears before a greater value symbol, it will be subtracted. For Example-  IX = X – I = 10 – 1 = 9.",
  "The symbols V, L, and D are never subtracted, as they are not written before a greater value symbol.",
  "The symbol I can be subtracted from V and X only and symbol X can be subtracted from symbols L, M and C only.",
];

const Rules = () => {
  return (
    <div>
      <h1>Rim number Calculator</h1>
      <p>Roman numbers</p>
      <ul>
        <li>M = 1000</li>
        <li>D = 500</li>
        <li>C = 100</li>
        <li>L = 50</li>
        <li>X = 10</li>
        <li>V = 5</li>
        <li>I = 1</li>
      </ul>

      <h2>Rules to Write Roman Numerals</h2>
      <p>
        There are certain rules to be followed if we have to represent a number
        in roman numerals form. Please check the rules listed below.
      </p>

      <ul>
        {listOfRules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default Rules;

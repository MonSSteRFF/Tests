import React, { useEffect, useState } from 'react';

import { difficulty } from '../gameConfig.json';
import useGame from '../Store/useGame';

const Options = () => {
  const [pickedDifficulty, setPickedDifficulty] = useState<string>('1');

  const changeDifficulty = useGame((store) => store.changeDifficulty);

  const restartHandler = () => {
    changeDifficulty(difficulty[Number(pickedDifficulty) - 1].speed);
  };

  useEffect(() => {
    restartHandler();
  }, []);

  return (
    <div>
      <p>Options</p>
      <select onChange={(e) => setPickedDifficulty(e.target.value)}>
        {difficulty.map((difItem, index) => {
          return (
            <option key={index} value={index + 1}>
              {difItem.name}
            </option>
          );
        })}
      </select>

      <button onClick={restartHandler}>restart</button>
    </div>
  );
};

export default Options;

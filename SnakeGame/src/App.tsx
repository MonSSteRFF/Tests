import React from 'react';

import KeyBoard from './Components/KeyBoard';
import Options from './Components/Options';
import Table from './Components/Table';

function App() {
  const titleName = 'Snake Game';

  return (
    <div style={{ padding: '60px' }}>
      <h1>{titleName}</h1>
      <Table />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <KeyBoard />
        <Options />
      </div>
    </div>
  );
}

export default App;

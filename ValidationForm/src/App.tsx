import React from 'react';

import Form from './components/Form';

function App() {
  const FormData = {
    title: 'Form for test',
    description: 'Description for this form',
  };

  return (
    <div>
      <Form FormData={FormData} />
    </div>
  );
}

export default App;

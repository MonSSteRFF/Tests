import { Button } from '@mui/material';
import React, { useState } from 'react';

import FormInput from './components/FormInput';
import useInput, { inputType } from './hooks/useInput';

function App() {
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);

  const userName = useInput({
    initValue: '',
    type: inputType.name,
    errorText: 'characters are not allowed in the name',
    required: true,
    label: 'Username',
  });
  const telephone = useInput({
    initValue: '',
    type: inputType.tel,
    errorText: 'phone is wrong',
    required: true,
    label: 'Telephone',
  });
  const message = useInput({
    initValue: '',
    type: inputType.message,
    errorText: '',
    required: false,
    label: 'Message',
  });

  const formInputs = [userName, telephone, message];

  const sendForm = () => {
    const values: { [key: string]: string } = {};
    let isSend = true;

    formInputs.forEach((input) => {
      if (input.value === '' && input.type !== inputType.message) {
        input.manualChangeError('required* text field');
        isSend = false;
      }
      if (input.isError) {
        input.manualChangeError();
        isSend = false;
      }

      values[input.label.toLowerCase()] = input.value;
    });

    if (isSend) {
      // todo: post form request here
      console.log(values);
    }
  };

  const clearForm = () => {
    formInputs.forEach((input) => input.manualChange(''));
  };

  return (
    <main className="formWrapper">
      <Button variant="contained" onClick={() => setFormIsVisible(!formIsVisible)}>
        {formIsVisible ? 'hide' : 'show'}
      </Button>

      {formIsVisible ? (
        <form className="myTestForm">
          <h1 className="title">Form for test</h1>

          {formInputs.map((input, index) => (
            <FormInput input={input} key={index} />
          ))}

          <Button variant="contained" onClick={sendForm} style={{ marginBottom: 20 }}>
            send form
          </Button>
          <Button variant="contained" onClick={clearForm}>
            clear
          </Button>
        </form>
      ) : null}
    </main>
  );
}

export default App;

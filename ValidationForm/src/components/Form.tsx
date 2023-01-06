import { Button } from '@mui/material';
import React, { useState } from 'react';

import useInput, { inputType } from '../hooks/useInput';
import FormInput from './FormInput';

import {Notyf} from "notyf";
import 'notyf/notyf.min.css';

interface FormProps {
  FormData: {
    title: string;
    description: string;
  };
}

const Form: React.FC<FormProps> = ({ FormData }) => {
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

  const notyf = new Notyf();

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

      if (input.label === 'Telephone') {
        const newValue = input.value
          .replaceAll('(', '')
          .replaceAll(')', '')
          .replaceAll('-', '')
          .replaceAll(' ', '');

        values[input.label.toLowerCase()] = newValue;
      } else {
        values[input.label.toLowerCase()] = input.value;
      }
    });

    if (isSend) {
      // todo: post form request here
      console.log(values);

      // success when axios or ajax success
      notyf.success('form upload');

      // when form not upload
      // notyf.error('error when form upload');
    } else {
      notyf.error('inputs is wrong');
    }
  };

  const clearForm = () => {
    formInputs.forEach((input) => {
      input.manualChangeError('');
      input.manualChange('');
      input.clearError();
    });
  };

  return (
    <div className="formWrapper">
      <Button variant="contained" onClick={() => setFormIsVisible(!formIsVisible)}>
        {formIsVisible ? 'hide' : 'show'}
      </Button>

      {formIsVisible ? (
        <form className="myTestForm">
          <h1 className="title">{FormData.title}</h1>
          <p className="description">{FormData.description}</p>

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
    </div>
  );
};

export default Form;

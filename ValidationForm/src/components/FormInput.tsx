import { TextField } from '@mui/material';
import React from 'react';

import { inputType, T_inputChangeHandler } from '../hooks/useInput';

interface I_FormInput {
  value: string;
  inputChangeHandler: T_inputChangeHandler;
  required: boolean;
  label: string;
  type: inputType;
  isError: boolean;
  helperText: string;
}

interface FormInputProps {
  input: I_FormInput;
}

const FormInput: React.FC<FormInputProps> = ({ input }) => {
  const { value, inputChangeHandler, required, label, type, isError, helperText } = input;

  return (
    <TextField
      multiline={type === inputType.message}
      maxRows={6}
      minRows={2}
      value={value}
      onChange={inputChangeHandler}
      required={required}
      label={label}
      variant="filled"
      error={isError}
      helperText={helperText}
    />
  );
};

export default FormInput;
export type { I_FormInput };

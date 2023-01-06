import { TextField } from '@mui/material';
import React from 'react';

import { inputType } from '../hooks/useInput';

const FormInput: React.FC<{ input: any }> = ({ input }) => {
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

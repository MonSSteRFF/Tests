import React, { useState } from 'react';

type T_inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

enum inputType {
  'name' = 'name',
  'message' = 'message',
  'tel' = 'tel',
  'text' = 'text',
}

interface useInputOptions {
  initValue: string;
  type: inputType;
  errorText: string;
  required: boolean;
  label: string;
}

interface I_useInputOutput {
  value: string;
  inputChangeHandler: T_inputChangeHandler;
  required: boolean;
  label: string;
  type: inputType;
  isError: boolean;
  helperText: string;
  manualChange: (value: string) => void;
  manualChangeError: (value?: string) => void;
  clearError: () => void;
}

type T_useInput = (options: useInputOptions) => I_useInputOutput;

const nameReg = new RegExp('^[A-zА-яЁё]+$');
const telReg = new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$');

const useInput: T_useInput = ({ initValue, type, errorText, required, label }) => {
  const [value, setValue] = useState<string>(initValue);
  const [isError, setIsError] = useState<boolean>(false);
  const [helperText, setHelperTextValue] = useState<string>('');

  const inputChangeHandler: T_inputChangeHandler = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    switch (type) {
      case inputType.name: {
        if (nameReg.test(newValue)) {
          setIsError(false);
          setHelperTextValue('');
        } else {
          setIsError(true);
          setHelperTextValue(errorText);
        }
        break;
      }
      case inputType.message: {
        if (nameReg.test(newValue)) {
          setIsError(false);
          setHelperTextValue('');
        } else {
          setIsError(true);
          setHelperTextValue(errorText);
        }
        break;
      }
      case inputType.tel: {
        if (telReg.test(newValue)) {
          setIsError(false);
          setHelperTextValue('');
        } else {
          setIsError(true);
          setHelperTextValue(errorText);
        }
        break;
      }
      case inputType.text: {
        break;
      }
    }
  };

  const manualChange = (value: string) => {
    setValue(value);
  };

  const manualChangeError = (error?: string) => {
    setIsError(true);
    setHelperTextValue(error !== undefined ? error : errorText);
  };

  const clearError = () => {
    setIsError(false);
  }

  return {
    value,
    inputChangeHandler,
    manualChange,
    manualChangeError,
    clearError,
    required,
    label,
    type,
    isError,
    helperText,
  };
};

export default useInput;
export { inputType };
export type { T_inputChangeHandler };

import { useState, useCallback, ChangeEvent, Dispatch, SetStateAction } from 'react';

type FormValues = Record<string, string>;

type FormErrors = Record<string, string>;

interface FormState {
  values: FormValues;
  errors: FormErrors;
  isValid: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: (newValues?: FormValues, newErrors?: FormErrors, newIsValid?: boolean) => void;
  setValues: Dispatch<SetStateAction<FormValues>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}

export function useFormAndValidation(): FormState {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form')?.checkValidity() ?? false);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

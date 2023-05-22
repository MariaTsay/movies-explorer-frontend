import React, { useCallback, useRef, useMemo } from "react";

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation(initialValue = {}) {
  const [values, setValues] = React.useState(initialValue);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const initialState = useRef(initialValue);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const isDirty = useMemo(() => {
    const initial = initialState.current;

    return Object.keys(values).some((key) => {
      return !initial[key] || initial[key] !== values[key]
    })
  }, [values])

  return { values, handleChange, errors, isValid, resetForm, isDirty };
}
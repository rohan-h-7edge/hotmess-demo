import { useReducer } from 'react';
import type { z } from 'zod';
import { FieldErrors, validateForm } from '@/utils/validation';

type FormValues = Record<string, string>;

interface FormState<T extends FormValues> {
  values: T;
  errors: FieldErrors<T>;
}

type FormAction<T extends FormValues> =
  | { type: 'changeField'; field: keyof T; value: string }
  | { type: 'setErrors'; errors: FieldErrors<T> };

const formReducer = <T extends FormValues>(state: FormState<T>, action: FormAction<T>): FormState<T> => {
  switch (action.type) {
    case 'changeField':
      return {
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case 'setErrors':
      return { ...state, errors: action.errors };
  }
};

export const useForm = <S extends z.ZodType<FormValues>>(schema: S, initialValues: z.infer<S>) => {
  const [state, dispatch] = useReducer(formReducer<z.infer<S>>, { values: initialValues, errors: {} });

  const changeField = (field: keyof z.infer<S>, value: string) => dispatch({ type: 'changeField', field, value });

  const validate = (): z.infer<S> | null => {
    const result = validateForm(schema, state.values);
    dispatch({ type: 'setErrors', errors: result.errors });
    return result.data;
  };

  return { values: state.values, errors: state.errors, changeField, validate };
};

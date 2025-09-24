import { AbstractControl, FormGroup } from '@angular/forms';

// ESTA FUNCION UTILIZA EL CLAUSURE DE JAVASCRIPT PARA MEMORIZAR EL FORM
export function createFormHelper(form: FormGroup) {
  function getError(field: string) {
    return getErrorMessage(form.get(field));
  }

  function hasError(field: string, error: string): boolean {
    const control = form.get(field);
    return !!control && control.hasError(error);
  }

  function haveErrors(field: string): boolean {
    const control = form.get(field);
    return !!control && control.touched && control.invalid;
  }

  return {
    hasError,
    haveErrors,
    getError
  };
}

const errorMessages: Record<string, (error?: any) => string> = {
  required: () => '*Requerido',
  minlength: (error) => `*Mínimo ${error.requiredLength} caracteres`,
  maxlength: (error) => `*Máximo ${error.requiredLength} caracteres`,
  pattern: () => `*Url inválida`,
  not_available: () => '*ID ya está en uso',
  dateInPast: () => '*Fecha debe ser mayor o igual a la actual',
  no_revision: () => '*Fecha inválida',
};

export const getErrorMessage = (control: AbstractControl | null): string | null => {
  if (control && control.errors && control.touched) {
    const firstErrorKey = Object.keys(control.errors)[0];
    const error = control.errors[firstErrorKey];

    const messageFn = errorMessages[firstErrorKey];
    return messageFn ? messageFn(error) : null;
  }
  return null;
};

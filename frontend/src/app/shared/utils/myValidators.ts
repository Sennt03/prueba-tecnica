import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProductsService } from '@services/products.service';
import { map, switchMap, timer } from 'rxjs';

export class MyValidators {
  // Validacion personalizada
  static validateLiberationDate(control: AbstractControl): ValidationErrors | null {
    try{
      const parts = control.value.split('-').map(Number);
      const selectedDate = new Date(parts[0], parts[1] - 1, parts[2]);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
  
      if (selectedDate < today) {
        return { dateInPast: true };
      }

      return null;
    }catch(err){
      return null;
    }
  }

  // Validacion asincrona
  static validIdUnique(service: ProductsService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return timer(500).pipe(
        // debounceTime simulado
        switchMap(() => service.validateAvaibleId(control.value)),
        map((response) => (response ? { not_available: true } : null)),
      );
    };
  }

  // Validacion grupal
  static releaseRequiresRevision(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const releaseDate = form.get('date_release');
      const revisionDate = form.get('date_revision');

      if (releaseDate && revisionDate && !revisionDate.value) {
        releaseDate.setErrors({ ...releaseDate.errors, no_revision: true });
      } else {
        if (releaseDate?.errors) {
          const { no_revision, ...others } = releaseDate.errors;
          releaseDate.setErrors(Object.keys(others).length ? others : null);
        }
      }

      return null;
    };
  }
}

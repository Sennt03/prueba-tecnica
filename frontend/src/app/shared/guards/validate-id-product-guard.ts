// validate-id-product.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';
import { ProductsService } from '@services/products.service';

export const validateIdProductGuard: CanActivateFn = (route, state) => {
  const id = route.paramMap.get('id');
  const router = inject(Router);
  const productsService = inject(ProductsService);

  if (!id) {
    router.navigate(['/']);
    return false;
  }

  return productsService.validateAvaibleId(id).pipe(
    map(isValid => {
      if (isValid) {
        return true;
      } 

      router.navigate(['/'])
      return false;
    }),
    catchError(() => {
      router.navigate(['/'])
      return of(false);
    })
  );
};

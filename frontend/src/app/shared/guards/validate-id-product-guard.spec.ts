import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateIdProductGuard } from './validate-id-product-guard';

describe('validateIdProductGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateIdProductGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

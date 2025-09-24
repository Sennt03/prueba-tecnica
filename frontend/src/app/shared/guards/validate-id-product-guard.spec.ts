import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { validateIdProductGuard } from './validate-id-product-guard';
import { ProductsService } from '@services/products.service';

describe('validateIdProductGuard', () => {
  let mockProductsService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockProductsService = {
      validateAvaibleId: jasmine.createSpy(),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  function createRouteSnapshot(id?: string) {
    return {
      paramMap: {
        get: (key: string) => (key === 'id' ? id ?? null : null),
      },
    } as any;
  }

  it('should redirect to / and return false if no id', () => {
    const route = createRouteSnapshot(undefined);

    const canActivate = TestBed.runInInjectionContext(() => validateIdProductGuard(route as any, {} as any));

    expect(canActivate).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should allow activation when id is valid', (done) => {
    const id = '123';
    const route = createRouteSnapshot(id);
    mockProductsService.validateAvaibleId.and.returnValue(of(true));

    const result = TestBed.runInInjectionContext(() => validateIdProductGuard(route as any, {} as any));

    if (result && typeof (result as any).subscribe === 'function') {
      (result as any).subscribe((res: boolean) => {
        expect(res).toBeTrue();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
        done();
      });
    } else {
      expect(result).toBeTrue();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      done();
    }
  });

  it('should redirect to / and return false if id is invalid', (done) => {
    const id = '123';
    const route = createRouteSnapshot(id);
    mockProductsService.validateAvaibleId.and.returnValue(of(false));

    const result = TestBed.runInInjectionContext(() => validateIdProductGuard(route as any, {} as any));

    if (result && typeof (result as any).subscribe === 'function') {
      (result as any).subscribe((res: boolean) => {
        expect(res).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
        done();
      });
    } else {
      expect(result).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
      done();
    }
  });

  it('should redirect to / and return false if service errors', (done) => {
    const id = '123';
    const route = createRouteSnapshot(id);
    mockProductsService.validateAvaibleId.and.returnValue(throwError(() => new Error('Server error')));

    const result = TestBed.runInInjectionContext(() => validateIdProductGuard(route as any, {} as any));

    if (result && typeof (result as any).subscribe === 'function') {
      (result as any).subscribe((res: boolean) => {
        expect(res).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
        done();
      });
    } else {
      expect(result).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
      done();
    }
  });
});

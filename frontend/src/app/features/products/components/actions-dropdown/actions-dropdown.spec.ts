import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActionsDropdown } from './actions-dropdown';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Alerts } from '@shared/utils/alerts';
import { LsProduct } from '@models/products.models';

describe('ActionsDropdown', () => {
  let fixture: ComponentFixture<ActionsDropdown>;
  let component: ActionsDropdown & any;
  let mockProductsService: any;
  let mockRouter: any;
  let alertsSpy: jasmine.Spy;

  const sampleProduct: LsProduct = {
    id: 'p1',
    name: 'Producto 1',
    description: 'Desc',
    logo: 'https://img.png',
    date_release: new Date('2025-09-24'),
    date_revision: new Date('2026-09-24'),
  };

  beforeEach(async () => {
    mockProductsService = {
      deleteProduct: jasmine.createSpy('deleteProduct'),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    alertsSpy = spyOn(Alerts, 'success');

    await TestBed.configureTestingModule({
      imports: [ActionsDropdown],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsDropdown as any);
    component = fixture.componentInstance as any;
    component.product = () => sampleProduct;
    component.reload = { emit: jasmine.createSpy('emit') };
    fixture.detectChanges();
  });

  it('should toggle open state', () => {
    expect(component.open()).toBeFalse();
    component.toggle();
    expect(component.open()).toBeTrue();
    component.toggle();
    expect(component.open()).toBeFalse();
  });

  it('clickOutside should close dropdown', () => {
    component.open.set(true);
    const evt = { target: document.createElement('div') } as unknown as Event;
    component.clickOutside(evt);
    expect(component.open()).toBeFalse();
  });

  it('deleteProduct should call dialog.open', () => {
    const dialogMock = { open: jasmine.createSpy('open') };
    component.deleteProduct(dialogMock as any);
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('onAcceptDelete should handle success', fakeAsync(() => {
    const response = { message: 'Deleted' };
    mockProductsService.deleteProduct.and.returnValue(of(response));
    component.onAcceptDelete();
    expect(component.loading()).toBeTrue();
    tick(300);
    expect(alertsSpy).toHaveBeenCalledWith('Deleted', 'Success');
    expect(component.reload.emit).toHaveBeenCalledWith(sampleProduct.id);
    expect(component.loading()).toBeFalse();
  }));

  it('editProduct should store in localStorage and navigate', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    component.editProduct();
    expect(setItemSpy).toHaveBeenCalledWith('active', JSON.stringify(sampleProduct));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/update/' + sampleProduct.id]);
  });
});

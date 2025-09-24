import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Overview } from './overview';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { of } from 'rxjs';
import { LsProduct } from '@models/products.models';
import { RouterTestingModule } from '@angular/router/testing';

describe('Overview', () => {
  let fixture: ComponentFixture<Overview>;
  let component: Overview & any;
  let mockProductsService: any;

  const sampleProducts: LsProduct[] = [
    {
      id: '1',
      name: 'Producto A',
      description: 'Desc A',
      logo: 'logo1.png',
      date_release: new Date('2025-01-01'),
      date_revision: new Date('2025-06-01'),
    },
    {
      id: '2',
      name: 'Producto B',
      description: 'Desc B',
      logo: 'logo2.png',
      date_release: new Date('2025-02-01'),
      date_revision: new Date('2025-07-01'),
    },
    {
      id: '3',
      name: 'Producto C',
      description: 'Desc C',
      logo: 'logo3.png',
      date_release: new Date('2025-03-01'),
      date_revision: new Date('2025-08-01'),
    },
  ];

  beforeEach(async () => {
    mockProductsService = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of({ data: sampleProducts })),
    };

    await TestBed.configureTestingModule({
      imports: [Overview, RouterTestingModule],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Overview as any);
    component = fixture.componentInstance as any;
    fixture.detectChanges();
  });

  it('should load products on ngOnInit', () => {
    expect(mockProductsService.getAll).toHaveBeenCalled();
    expect(component.products().length).toBe(3);
    expect(component.loading()).toBeFalse();
  });

  it('removeProduct should remove product by id', () => {
    component.removeProduct('2');
    const ids = component.products().map((p: LsProduct) => p.id);
    expect(ids).not.toContain('2');
    expect(ids.length).toBe(2);
  });

  it('filteredProducts should filter by name', () => {
    component.filterText.set('Producto B');
    const filtered = component.filteredProducts;
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('2');
  });

  it('filteredProducts should filter by description', () => {
    component.filterText.set('Desc C');
    const filtered = component.filteredProducts;
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('3');
  });

  it('toggleSort should change sortField and sortAsc', () => {
    expect(component.sortField()).toBe('name');
    expect(component.sortAsc()).toBeTrue();
    component.toggleSort('description');
    expect(component.sortField()).toBe('description');
    expect(component.sortAsc()).toBeTrue();
    component.toggleSort('description');
    expect(component.sortAsc()).toBeFalse();
  });

  it('paginatedProducts should return correct slice', () => {
    component.pageSize.set(2);
    component.pageIndex.set(0);
    let page = component.paginatedProducts;
    expect(page.length).toBe(2);
    expect(page[0].id).toBe('1');
    expect(page[1].id).toBe('2');

    component.pageIndex.set(1);
    page = component.paginatedProducts;
    expect(page.length).toBe(1);
    expect(page[0].id).toBe('3');
  });

  it('nextPage should increment pageIndex', () => {
    component.pageSize.set(1);
    component.pageIndex.set(0);
    component.nextPage();
    expect(component.pageIndex()).toBe(1);
    component.nextPage();
    expect(component.pageIndex()).toBe(2);
    component.nextPage();
    expect(component.pageIndex()).toBe(2);
  });

  it('prevPage should decrement pageIndex', () => {
    component.pageIndex.set(2);
    component.prevPage();
    expect(component.pageIndex()).toBe(1);
    component.prevPage();
    expect(component.pageIndex()).toBe(0);
    component.prevPage();
    expect(component.pageIndex()).toBe(0);
  });

  it('changePageSize should update pageSize and reset pageIndex', () => {
    component.pageIndex.set(1);
    component.pageSize.set(5);
    component.changePageSize(10);
    expect(component.pageSize()).toBe(10);
    expect(component.pageIndex()).toBe(0);
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Form } from './form';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { Alerts } from '@shared/utils/alerts';

describe('Form Component (unit tests)', () => {
  let fixture: ComponentFixture<Form>;
  let component: Form;
  let router: Router;
  let route: ActivatedRoute;

  let mockProductsService: any;

  beforeEach(waitForAsync(() => {
    mockProductsService = {
      createProduct: jasmine.createSpy('createProduct'),
      editProduct: jasmine.createSpy('editProduct'),
      validateAvaibleId: jasmine.createSpy('validateAvaibleId').and.returnValue(of(true)),
    };

    spyOn(Alerts, 'success').and.callThrough();
    spyOn(Alerts, 'error').and.callThrough();

    TestBed.configureTestingModule({
      imports: [Form, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ProductsService, useValue: mockProductsService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['id', null]])) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create the form with all controls after ngOnInit', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('id')).toBeDefined();
    expect(component.form.get('name')).toBeDefined();
    expect(component.form.get('description')).toBeDefined();
    expect(component.form.get('logo')).toBeDefined();
    expect(component.form.get('date_release')).toBeDefined();
    expect(component.form.get('date_revision')).toBeDefined();
  });

  it('cleanForm should reset form', () => {
    component.form.patchValue({ id: '123', name: 'A' });
    component.edit.set('123');

    component.cleanForm();
    expect(component.form.get('id')?.value).toBe('123');
    expect(component.form.get('name')?.value).toBeNull();
  });

  it('onReleaseDateChange should update date_revision correctly', () => {
    const event = { target: { value: '2025-09-24' } } as any;
    component.onReleaseDateChange(event);

    const rev = component.form.get('date_revision')?.value;
    const expected = new Date('2025-09-24');
    expected.setFullYear(expected.getFullYear() + 1);
    const formatted = expected.toISOString().substring(0, 10);

    expect(rev).toBe(formatted);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paginator } from './paginator';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Paginator', () => {
  let fixture: ComponentFixture<Paginator>;
  let component: Paginator & any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paginator],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Paginator as any);
    component = fixture.componentInstance as any;

    component.prev = { emit: jasmine.createSpy('emit') };
    component.next = { emit: jasmine.createSpy('emit') };
    component.pageSizeChange = { emit: jasmine.createSpy('emit') };
    component.pageIndex = () => 0;
    component.pageSize = () => 10;
    component.totalItems = () => 50;

    fixture.detectChanges();
  });

  it('should initialize inputs correctly', () => {
    expect(component.pageIndex()).toBe(0);
    expect(component.pageSize()).toBe(10);
    expect(component.totalItems()).toBe(50);
  });

  it('should emit prev on prev button click', () => {
    component.prev.emit();
    expect(component.prev.emit).toHaveBeenCalled();
  });

  it('should emit next on next button click', () => {
    component.next.emit();
    expect(component.next.emit).toHaveBeenCalled();
  });

  it('onPageSizeChange should emit selected value', () => {
    const event = { target: { value: '20' } } as unknown as Event;
    component.onPageSizeChange(event);
    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(20);
  });

  it('onPageSizeChange should handle string numbers correctly', () => {
    const event = { target: { value: '5' } } as unknown as Event;
    component.onPageSizeChange(event);
    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(5);
  });
});

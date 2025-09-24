import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filter } from './filter';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Filter', () => {
  let fixture: ComponentFixture<Filter>;
  let component: Filter & any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filter],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Filter as any);
    component = fixture.componentInstance as any;
    component.filterTextChange = { emit: jasmine.createSpy('emit') };
    fixture.detectChanges();
  });

  it('should initialize filterText as empty', () => {
    expect(component.filterText()).toBe('');
  });

  it('onInput should emit the input value', () => {
    const inputEvent = { target: { value: 'test' } } as unknown as Event;
    component.onInput(inputEvent);
    expect(component.filterTextChange.emit).toHaveBeenCalledWith('test');
  });

  it('onInput should handle empty string', () => {
    const inputEvent = { target: { value: '' } } as unknown as Event;
    component.onInput(inputEvent);
    expect(component.filterTextChange.emit).toHaveBeenCalledWith('');
  });
});

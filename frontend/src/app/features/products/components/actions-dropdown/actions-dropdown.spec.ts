import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsDropdown } from './actions-dropdown';

describe('ActionsDropdown', () => {
  let component: ActionsDropdown;
  let fixture: ComponentFixture<ActionsDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ProductsComponent (unit tests)', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: ProductsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('modalOpen should be false by default', () => {
    expect(component.modalOpen()).toBeFalse();
  });

  it('toggleModal should toggle modalOpen signal', () => {
    expect(component.modalOpen()).toBeFalse();
    component.toggleModal();
    expect(component.modalOpen()).toBeTrue();
    component.toggleModal();
    expect(component.modalOpen()).toBeFalse();
  });

  it('should add "active" class when modalOpen is true', () => {
    const modal = fixture.debugElement.query(By.css('.info-modal'));
    expect(modal.nativeElement.classList.contains('active')).toBeFalse();

    component.toggleModal();
    fixture.detectChanges();

    expect(modal.nativeElement.classList.contains('active')).toBeTrue();
  });

  it('clicking .info-tab should open modal', () => {
    const tab = fixture.debugElement.query(By.css('.info-tab'));
    tab.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.modalOpen()).toBeTrue();
    const modal = fixture.debugElement.query(By.css('.info-modal'));
    expect(modal.nativeElement.classList.contains('active')).toBeTrue();
  });

  it('clicking .modal-close should close modal', () => {
    component.toggleModal();
    fixture.detectChanges();
    expect(component.modalOpen()).toBeTrue();

    const closeBtn = fixture.debugElement.query(By.css('.modal-close'));
    closeBtn.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.modalOpen()).toBeFalse();
    const modal = fixture.debugElement.query(By.css('.info-modal'));
    expect(modal.nativeElement.classList.contains('active')).toBeFalse();
  });
});

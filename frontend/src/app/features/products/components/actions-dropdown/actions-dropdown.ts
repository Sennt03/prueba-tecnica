import { Component, HostListener, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LsProduct } from '@models/products.models';
import { ProductsService } from '@services/products.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Alerts } from '@shared/utils/alerts';

@Component({
  selector: 'app-actions-dropdown',
  standalone: true,
  imports: [ConfirmDialogComponent, LoadingComponent],
  templateUrl: './actions-dropdown.html',
  styleUrl: './actions-dropdown.scss'
})
export class ActionsDropdown {

  private producstService = inject(ProductsService)
  private router = inject(Router)
  private static openDropdownRef = signal<ActionsDropdown | null>(null);

  loading = signal(false);
  open = signal(false);
  product = input.required<LsProduct>()
  reload = output<string>()

  text = signal('¿Deseas eliminar?')

  toggle() {
    const previous = ActionsDropdown.openDropdownRef();
    if (previous && previous !== this) {
      previous.open.set(false);
    }

    this.open.set(!this.open());

    ActionsDropdown.openDropdownRef.set(this.open() ? this : null);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.open.set(false);
      ActionsDropdown.openDropdownRef.set(null);
    }
  }

  deleteProduct(dialog: ConfirmDialogComponent){
    this.text.set(`¿Estas seguro de eliminar el producto "${this.product().name}"?`)
    dialog.open()
  }

  onAcceptDelete(){
    this.loading.set(true)
    this.producstService.deleteProduct(this.product().id).subscribe({
      next: res => {
        setTimeout(() => {
          Alerts.success(res.message, "Success")
          this.reload.emit(this.product().id)
          this.loading.set(false)
        }, 300);
      },
      error: err  => {
        this.loading.set(false)
        Alerts.success("Error al eliminar", "Error")
      }
    })
  }

  editProduct(){
    localStorage.setItem('active', JSON.stringify(this.product()))
    this.router.navigate(['/products/update/' + this.product().id])
  }

}

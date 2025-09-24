import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products.component',
  imports: [RouterOutlet],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent {
  modalOpen = signal(false);

  toggleModal() {
    this.modalOpen.set(!this.modalOpen());
  }
}

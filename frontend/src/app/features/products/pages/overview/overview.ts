import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActionsDropdown } from '@features/products/components/actions-dropdown/actions-dropdown';
import { Filter } from '@features/products/components/filter/filter';
import { Paginator } from '@features/products/components/paginator/paginator';
import { LsProduct } from '@models/products.models';
import { ProductsService } from '@services/products.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, Filter, Paginator, ActionsDropdown, RouterLink],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
})
export class Overview implements OnInit{
  
  private productsService = inject(ProductsService)

  loading = signal(false);
  filterText = signal('');
  pageSize = signal(5);
  pageIndex = signal(0);

  products = signal<LsProduct[]>([]);

  sortField = signal<'name' | 'description' | 'date_release' | 'date_revision'>('name');
  sortAsc = signal(true);

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(){
    this.loading.set(true)
    this.productsService.getAll().subscribe({
      next: res => {
        this.loading.set(false)
        this.products.set(res.data)
      }
    })
  }

  removeProduct(id: string){
    this.products.update(products => {
      const newProducts = products.filter(product => product.id != id)
      return newProducts
    })
  }

  get filteredProducts() {
    const result = this.products().filter(
      (p) =>
        p.name.toLowerCase().includes(this.filterText().toLowerCase()) ||
        p.description.toLowerCase().includes(this.filterText().toLowerCase()) ||
        p.date_release.toString().includes(this.filterText().toLowerCase()) ||
        p.date_revision.toString().includes(this.filterText().toLowerCase())
    );
    return result.sort((a, b) => {
      const fieldA = a[this.sortField()];
      const fieldB = b[this.sortField()];
      if (fieldA < fieldB) return this.sortAsc() ? -1 : 1;
      if (fieldA > fieldB) return this.sortAsc() ? 1 : -1;
      return 0;
    });
  }

  toggleSort(field: 'name' | 'description' | 'date_release' | 'date_revision') {
    if (this.sortField() === field) {
      this.sortAsc.set(!this.sortAsc());
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  get paginatedProducts() {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredProducts.slice(start, start + this.pageSize());
  }

  nextPage() {
    if ((this.pageIndex() + 1) * this.pageSize() < this.filteredProducts.length)
      this.pageIndex.set(this.pageIndex() + 1);
  }

  prevPage() {
    if (this.pageIndex() > 0) this.pageIndex.set(this.pageIndex() - 1);
  }

  changePageSize(size: number) {
    this.pageSize.set(size);
    this.pageIndex.set(0);
  }

}

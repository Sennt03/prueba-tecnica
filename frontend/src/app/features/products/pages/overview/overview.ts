import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActionsDropdown } from '@features/products/components/actions-dropdown/actions-dropdown';
import { Filter } from '@features/products/components/filter/filter';
import { Paginator } from '@features/products/components/paginator/paginator';

interface Product {
  id: number;
  logo: string;
  name: string;
  description: string;
  releaseDate: string;
  restructureDate: string;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, Filter, Paginator, ActionsDropdown, RouterLink],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
})
export class Overview {
  filterText = signal('');
  pageSize = signal(5);
  pageIndex = signal(0);

  products = signal<Product[]>([
    {
      id: 1,
      logo: 'https://via.placeholder.com/40',
      name: 'Producto A',
      description: 'Descripción A',
      releaseDate: '01/01/2000',
      restructureDate: '01/02/2001',
    },
    {
      id: 2,
      logo: 'https://via.placeholder.com/40',
      name: 'Producto B',
      description: 'Descripción B',
      releaseDate: '02/03/2002',
      restructureDate: '03/04/2003',
    },
    {
      id: 3,
      logo: 'https://via.placeholder.com/40',
      name: 'Producto C',
      description: 'Descripción C',
      releaseDate: '05/06/2004',
      restructureDate: '07/08/2005',
    },
    {
      id: 4,
      logo: 'https://via.placeholder.com/40',
      name: 'Producto D',
      description: 'Descripción D',
      releaseDate: '09/10/2006',
      restructureDate: '11/12/2007',
    },
    {
      id: 5,
      logo: 'https://via.placeholder.com/40',
      name: 'Producto E',
      description: 'Descripción E',
      releaseDate: '01/01/2008',
      restructureDate: '01/02/2009',
    },
    {
      id: 6,
      logo: 'https://via.placeholder.com/40',
      name: 'Producto F',
      description: 'Descripción F',
      releaseDate: '03/03/2010',
      restructureDate: '04/04/2011',
    },
  ]);

  sortField = signal<'name' | 'description' | 'releaseDate' | 'restructureDate'>('name');
  sortAsc = signal(true);

  get filteredProducts() {
    const result = this.products().filter(
      (p) =>
        p.name.toLowerCase().includes(this.filterText().toLowerCase()) ||
        p.description.toLowerCase().includes(this.filterText().toLowerCase()),
    );
    return result.sort((a, b) => {
      const fieldA = a[this.sortField()];
      const fieldB = b[this.sortField()];
      if (fieldA < fieldB) return this.sortAsc() ? -1 : 1;
      if (fieldA > fieldB) return this.sortAsc() ? 1 : -1;
      return 0;
    });
  }

  toggleSort(field: 'name' | 'description' | 'releaseDate' | 'restructureDate') {
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

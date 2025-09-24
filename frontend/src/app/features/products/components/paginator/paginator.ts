import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator {
  pageIndex = input(0);
  pageSize = input(0);
  totalItems = input(0);

  prev = output<void>();
  next = output<void>();
  pageSizeChange = output<number>();

  onPageSizeChange(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;
    this.pageSizeChange.emit(value);
  }
}

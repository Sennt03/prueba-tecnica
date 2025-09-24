import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  filterText = input('');
  filterTextChange = output<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterTextChange.emit(value);
  }
}

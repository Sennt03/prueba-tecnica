import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-actions-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './actions-dropdown.html',
  styleUrl: './actions-dropdown.scss'
})
export class ActionsDropdown {

  private static openDropdownRef = signal<ActionsDropdown | null>(null);

  open = signal(false);

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

}

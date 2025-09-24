import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  visible = signal(false);

  accepted = output<void>();
  text = input<string>();

  open() {
    this.visible.set(true);
  }

  accept() {
    this.visible.set(false);
    this.accepted.emit();
  }

  cancel() {
    this.visible.set(false);
  }
}

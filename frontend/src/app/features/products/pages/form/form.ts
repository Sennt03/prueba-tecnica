import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFileName: string = '';
  reviewDate = '';

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFileName = file.name;
    }
  }

  onReleaseDateChange(event: Event) {
    const releaseDate = (event.target as HTMLInputElement).value;
    if (releaseDate) {
      const date = new Date(releaseDate);
      date.setFullYear(date.getFullYear() + 1);
      this.reviewDate = date.toISOString().substring(0, 10);
    }
  }
}

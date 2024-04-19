import { Component } from '@angular/core';
import { EdituserService } from '../edituser.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  selectedImage: any;
  imageUrl: string = '';
  url: string = '../assets/user.png';
  maxSizeMB = 5;
  constructor(private ed: EdituserService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image')) {
        this.selectedImage = null;
        return;
      }
      if (file.size > this.maxSizeMB * 310 * 325) {
        alert(`File size exceeds ${this.maxSizeMB}MB limit.`);
        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        this.ed.setImageData(imageData);
      };
      reader.readAsDataURL(file);
    }
  }
  getImageData(): string | ArrayBuffer | null {
    return this.ed.getImageData();
  }
}

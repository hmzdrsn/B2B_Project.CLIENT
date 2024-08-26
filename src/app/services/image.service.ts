import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  httpClient: HttpClient = inject(HttpClient);
  

  deleteImage(imageId: string) {
    this.httpClient.delete('https://localhost:8001/api/Image/DeleteById?ImageId=' + imageId).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}

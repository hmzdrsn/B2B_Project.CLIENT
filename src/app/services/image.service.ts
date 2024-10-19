import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  httpClient: HttpClient = inject(HttpClient);
  baseUrl : string;
  constructor(){
    this.baseUrl = environment.apiUrl;
  }

  deleteImage(imageId: string) {
    this.httpClient.delete(`${this.baseUrl}api/Image/DeleteById?ImageId=` + imageId).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
  
}

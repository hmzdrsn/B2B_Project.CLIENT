import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { Product, ProductResponse } from "./models/ProductResponse";
import { ResponseModel } from "./models/Response";
import { GlobalmessageService } from "./globalmessage.service";
@Injectable({
    providedIn:"root"
})
export class ProductService {
    _httpClient: HttpClient = inject(HttpClient);
    _messageService : GlobalmessageService  = inject(GlobalmessageService);
     getCompanyProducts() : Observable<ProductResponse<Product[]>>{
         return this._httpClient
         .get<ResponseModel<ProductResponse<Product[]>>>("https://localhost:8001/api/Product/GetCompanyProducts")
         .pipe(map(res=>res.data))
     }
     //class göndereceksek header ayarı yapılabilir. Denemek lazım
     //let headers = new Headers();
     /** In Angular 5, including the header Content-Type can invalidate your request */
     //headers.append('Content-Type', 'multipart/form-data');
     //headers.append('Accept', 'application/json');
     createProduct(formData : FormData) {
        this._httpClient.post('https://localhost:8001/api/Product/CreateProduct', formData).subscribe(response => {
               console.log(response);
               this._messageService.addMessage("s","s","");
             }, error => {
               console.error(error);
             });

     }
     
   
}
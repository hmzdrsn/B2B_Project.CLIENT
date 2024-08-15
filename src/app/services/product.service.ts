import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { Product, ProductResponse } from "./models/ProductResponse";
import { ResponseModel } from "./models/Response";
@Injectable({
    providedIn:"root"
})
export class ProductService {
    _httpClient: HttpClient = inject(HttpClient);

     getCompanyProducts() : Observable<ProductResponse<Product[]>>{
         return this._httpClient
         .get<ResponseModel<ProductResponse<Product[]>>>("https://localhost:7146/api/Product/GetCompanyProducts")
         .pipe(map(res=>res.data))
     }
   
}
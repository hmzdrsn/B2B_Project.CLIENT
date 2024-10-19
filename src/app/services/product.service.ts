import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { DefaultFilter, Product, ProductCountModel, ProductResponse, ProductResponse2, UpdateProductModel } from "./models/ProductResponse";
import { ResponseModel } from "./models/Response";
import { GlobalmessageService } from "./globalmessage.service";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Injectable({
    providedIn:"root"
})
export class ProductService {
    _httpClient: HttpClient = inject(HttpClient);
    _router : Router = inject(Router)
    _messagesService = inject(GlobalmessageService);

    baseUrl: string;
    constructor() {
      this.baseUrl = environment.apiUrl;
    }

    getCompanyProducts(): Observable<ProductResponse<Product[]>> {
      return this._httpClient
        .get<ResponseModel<ProductResponse<Product[]>>>(`${this.baseUrl}api/Product/GetCompanyProducts`)
        .pipe(map(res => res.data));
    }
    
    getProductById(productId: string): Observable<ProductResponse2> {
      return this._httpClient.get<ResponseModel<ProductResponse2>>(`${this.baseUrl}api/Product/GetById?ProductId=` + productId)
        .pipe(map(res => res.data));
    }
    //class göndereceksek header ayarı yapılabilir. Denemek lazım
     //let headers = new Headers();
     /** In Angular 5, including the header Content-Type can invalidate your request */
     //headers.append('Content-Type', 'multipart/form-data');
     //headers.append('Accept', 'application/json');
    createProduct(formData: FormData) {
      this._httpClient.post(`${this.baseUrl}api/Product/CreateProduct`, formData).subscribe(response => {
        }, error => {
          console.error(error);
        });
    }
    
    updateProduct(formData: FormData) {
      this._httpClient.post(`${this.baseUrl}api/Product/UpdateProduct`, formData).subscribe(res => {
        this._messagesService.addMessage('success', '', 'Ürün Güncellendi');
        this._router.navigateByUrl('company/product');
      }),
      err => {
        console.log(err);
      };
    }
    
    deleteProduct(productId: string) {
      this._httpClient.delete(`${this.baseUrl}api/Product/DeleteById?ProductId=` + productId).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }
    
    getProductByDefaultFilter(currentPage: number, pageSize: number): Observable<DefaultFilter[]> {
      return this._httpClient.get<ResponseModel<DefaultFilter[]>>(`${this.baseUrl}api/Product/GetProductsByDefaultFilter?CurrentPage=${currentPage}&PageSize=${pageSize}`)
        .pipe(map(res => res.data));
    }
    
    getProductsCount(): Observable<number> {
      return this._httpClient.get<ResponseModel<ProductCountModel>>(`${this.baseUrl}api/Product/GetProductsCount`)
        .pipe(map(res => res.data.productsCount));
    }
    
}
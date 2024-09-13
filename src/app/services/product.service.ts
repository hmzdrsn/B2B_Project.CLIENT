import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { DefaultFilter, Product, ProductCountModel, ProductResponse, ProductResponse2, UpdateProductModel } from "./models/ProductResponse";
import { ResponseModel } from "./models/Response";
import { GlobalmessageService } from "./globalmessage.service";
import { Router } from "@angular/router";
@Injectable({
    providedIn:"root"
})
export class ProductService {
    _httpClient: HttpClient = inject(HttpClient);
    _router : Router = inject(Router)
    constructor(private _messagesService:GlobalmessageService) {
      
    }
     getCompanyProducts() : Observable<ProductResponse<Product[]>>{
         return this._httpClient
         .get<ResponseModel<ProductResponse<Product[]>>>("https://localhost:8001/api/Product/GetCompanyProducts")
         .pipe(map(res=>res.data))
     }

     getProductById(productId:string): Observable<ProductResponse2>
     {
      return this._httpClient.get<ResponseModel<ProductResponse2>>('https://localhost:8001/api/Product/GetById?ProductId='+productId)
      .pipe(map(res=>res.data))
     }

     //class göndereceksek header ayarı yapılabilir. Denemek lazım
     //let headers = new Headers();
     /** In Angular 5, including the header Content-Type can invalidate your request */
     //headers.append('Content-Type', 'multipart/form-data');
     //headers.append('Accept', 'application/json');
     createProduct(formData : FormData) {
        this._httpClient.post('https://localhost:8001/api/Product/CreateProduct', formData).subscribe(response => {
             }, error => {
               console.error(error);
             });

     }
     
     updateProduct(formData : FormData){
      this._httpClient.post('https://localhost:8001/api/Product/UpdateProduct',formData).subscribe(res=>{
        this._messagesService.addMessage('success','','Ürün Güncellendi')
        this._router.navigateByUrl('company/product')
      }),
      err=>{
        console.log(err);
      }
     }

     deleteProduct(productId: string) {
      this._httpClient.delete('https://localhost:8001/api/Product/DeleteById?ProductId=' + productId).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }
    
    getProductByDefaultFilter(currentPage:number,pageSize:number):Observable<DefaultFilter[]>{
      return this._httpClient.get<ResponseModel<DefaultFilter[]>>(`https://localhost:8001/api/Product/GetProductsByDefaultFilter?CurrentPage=${currentPage}&PageSize=${pageSize}`)
      .pipe(map(res=>res.data))
    }
    
    getProductsCount():Observable<number>{
      const productsCount :number = 0;
      return this._httpClient.get<ResponseModel<ProductCountModel>>("https://localhost:8001/api/Product/GetProductsCount")
      .pipe(map(res=>res.data.productsCount))
    }
}
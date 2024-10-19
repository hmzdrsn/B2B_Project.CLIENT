import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseModel } from './models/Response';
import { BasketItem, BasketItemResponse } from './models/BasketItemResponse';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  _httpClient = inject(HttpClient);

  baseUrl : string;
  constructor(){
    this.baseUrl = environment.apiUrl;
  }

  addProductToBasket(productId:string) : Observable<boolean>{
    const body= {
      "productId" : productId,
      "quantity" :1
    } 
    return this._httpClient.post(`${this.baseUrl}api/Basket/AddProductToBasket`,body).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
  getBasketItemsByUser() : Observable<BasketItemResponse<BasketItem>>{
    return this._httpClient.get<ResponseModel<BasketItemResponse<BasketItem>>>(`${this.baseUrl}api/Basket/GetBasketItemsByUsername`)
    .pipe(map(res=>res.data))
  }
  removeProductFromBasket(productId: string): Observable<boolean> {
    return this._httpClient.post<boolean>(`${this.baseUrl}api/Basket/RemoveProductFromBasket?productId=` + productId, null)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  reduceQuantityFromBasket(productId:string): Observable<boolean>{
    return this._httpClient.post(`${this.baseUrl}api/Basket/ReduceProductQuantityFromBasket?productId=`+productId,null)
    .pipe(map(()=>true),
    catchError(()=> of(false)))
  }

  increaseQuantityFromBasket(productId:string): Observable<boolean>{
    return this._httpClient.post(`${this.baseUrl}api/Basket/IncreaseProductQuantityFromBasket?productId=`+productId,null)
    .pipe(map(()=>true),
    catchError(()=> of(false)))
  }
  
}

import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Discount, DiscountWithoutDetail, ProductDiscount, UserDiscount } from './models/DiscountResponse';
import { ResponseModel } from './models/Response';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  _httpClient = inject(HttpClient);

  getCompanyDiscounts() : Observable<Discount[]>{
    return this._httpClient.get<ResponseModel<Discount[]>>("https://localhost:8001/api/Discount/GetCompanyDiscounts")
    .pipe(map(res=>res.data));
  }

  createDiscount(discount: Discount):Observable<ResponseModel<null>>{
    return this._httpClient.post<ResponseModel<null>>("https://localhost:8001/api/Discount/CreateDiscount",discount)
    .pipe(map(res=>res));
  }

  removeDiscount(discountId:string):Observable<ResponseModel<null>>{
    return this._httpClient.post<ResponseModel<null>>(`https://localhost:8001/api/Discount/RemoveDiscount?discountId=${discountId}`,null)
    .pipe(map(res=>res))
  }

  assignDiscountToProduct(discountId:string,productId:string):Observable<ResponseModel<null>>{
    return this._httpClient.post<ResponseModel<null>>(`https://localhost:8001/api/Discount/AssignDiscountToProduct?productId=${productId}&discountId=${discountId}`,null)
    .pipe(map(res=>res))
    
  }

  assignDiscountToUser(discountId:string,usernameTo:string):Observable<ResponseModel<null>>{
    return this._httpClient.post<ResponseModel<null>>(`https://localhost:8001/api/Discount/AssignDiscountToUser?usernameTo=${usernameTo}&discountId=${discountId}`,null)
    .pipe(map(res=>res))
  }
  getProductDiscount(productId:string): Observable<DiscountWithoutDetail[]>{
    return this._httpClient.get<ResponseModel<DiscountWithoutDetail[]>>(`https://localhost:8001/api/Discount/GetProductDiscount?ProductId=${productId}`).pipe(map(res=>res.data))
  }
  removeProductDiscount(productId:string,discountId:string):Observable<ResponseModel<null>>{
    const body = {
      productId:productId,
      discountId:discountId
    }
    return this._httpClient.post<ResponseModel<null>>("https://localhost:8001/api/Discount/RemoveProductDiscount",body)
    .pipe(map(res=>res))
  }
  removeUserDiscount(userDiscountId:string):Observable<ResponseModel<null>>{
    return this._httpClient.post<ResponseModel<null>>(`https://localhost:8001/api/Discount/RemoveUserDiscount?userDiscountId=${userDiscountId}`,null)
    .pipe(map(res=>res))
  }
  removeProductDiscountById(productDiscountId:string):Observable<ResponseModel<null>>{
    return this._httpClient.post<ResponseModel<null>>(`https://localhost:8001/api/Discount/RemoveProductDiscountById?productDiscountId=${productDiscountId}`,null)
    .pipe(map(res=>res))
  }
  
  getUserDiscounts():Observable<UserDiscount[]>{
    return this._httpClient.get<ResponseModel<UserDiscount[]>>("https://localhost:8001/api/Discount/GetUserDiscounts")
    .pipe(map(res=>res.data))
  }
  getProductDiscounts():Observable<ProductDiscount[]>{
    return this._httpClient.get<ResponseModel<ProductDiscount[]>>("https://localhost:8001/api/Discount/GetProductDiscounts")
    .pipe(map(res=>res.data));
  }
}

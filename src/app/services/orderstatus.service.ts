import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseModel } from './models/Response';
import { OrderStatusResponse } from './models/OrderStatusResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderstatusService {

  _httpClient  : HttpClient = inject(HttpClient);

  getAll() : Observable<OrderStatusResponse>{
    return this._httpClient.get<ResponseModel<OrderStatusResponse>>('https://localhost:8001/api/OrderStatus/GetAll')
    .pipe(map(res=>res.data))
  }
}

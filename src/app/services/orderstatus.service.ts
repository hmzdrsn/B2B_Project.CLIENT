import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseModel } from './models/Response';
import { OrderStatusResponse } from './models/OrderStatusResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderstatusService {

  _httpClient  : HttpClient = inject(HttpClient);
  baseUrl : string;
  constructor(){
    this.baseUrl = environment.apiUrl;
  }
  getAll(): Observable<OrderStatusResponse> {
    return this._httpClient.get<ResponseModel<OrderStatusResponse>>(`${this.baseUrl}api/OrderStatus/GetAll`)
      .pipe(map(res => res.data));
  }
  
}

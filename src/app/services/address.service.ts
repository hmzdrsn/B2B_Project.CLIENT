import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseModel } from './models/Response';
import { Address, AddressResponse } from './models/AddressResponse';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  _httpClient = inject(HttpClient)
  baseUrl : string;
  constructor(){
    this.baseUrl = environment.apiUrl;
  }
  getUserAddresses():Observable<Address[]>{
    return this._httpClient.get<ResponseModel<AddressResponse<Address[]>>>(`${this.baseUrl}api/Address/GetUserAddresses`)
    .pipe(map(res=>res.data.addresses))
  }

  setAddressStatus(addressId:string):Observable<boolean>{
    return this._httpClient.post(`${this.baseUrl}api/Address/SetAddressStatus?addressId=`+addressId,null)
    .pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}

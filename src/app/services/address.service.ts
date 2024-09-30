import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseModel } from './models/Response';
import { Address, AddressResponse } from './models/AddressResponse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  _httpClient = inject(HttpClient)

  getUserAddresses():Observable<Address[]>{
    return this._httpClient.get<ResponseModel<AddressResponse<Address[]>>>("https://localhost:8001/api/Address/GetUserAddresses")
    .pipe(map(res=>res.data.addresses))
  }

  setAddressStatus(addressId:string):Observable<boolean>{
    return this._httpClient.post("https://localhost:8001/api/Address/SetAddressStatus?addressId="+addressId,null)
    .pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}

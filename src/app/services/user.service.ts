import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserMessageModel } from "./models/UserResponse";
import { ResponseModel } from "./models/Response";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  _httpClient = inject(HttpClient);

  getUsers(): Observable<UserMessageModel[]>{
    return this._httpClient.get<ResponseModel<UserMessageModel[]>>("https://localhost:8001/api/User/GetUserShortProperties").pipe(
      map((res)=>res.data)
    )
  }
  
}
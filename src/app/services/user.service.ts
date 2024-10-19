import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserMessageModel } from "./models/UserResponse";
import { ResponseModel } from "./models/Response";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  _httpClient = inject(HttpClient);
  baseUrl: string;
  constructor() {
    this.baseUrl = environment.apiUrl;
  }
  getUsers(): Observable<UserMessageModel[]> {
    return this._httpClient.get<ResponseModel<UserMessageModel[]>>(`${this.baseUrl}api/User/GetUserShortProperties`)
      .pipe(map((res) => res.data));
  }
}
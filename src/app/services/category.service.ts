import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ResponseModel } from "./models/Response";
import { Category, CategoryResponse } from "./models/CategoryResponse";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn:"root"
})
export class CategoryService {
    httpClient: HttpClient = inject(HttpClient);
    baseUrl : string;
  constructor(){
    this.baseUrl = environment.apiUrl;
  }

  getCategories(): Observable<CategoryResponse<Category[]>> {
    return this.httpClient.get<ResponseModel<CategoryResponse<Category[]>>>(`${this.baseUrl}api/Category`)
    .pipe(map(res => res.data));
}

}

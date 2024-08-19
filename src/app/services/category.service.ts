import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ResponseModel } from "./models/Response";
import { Category, CategoryResponse } from "./models/CategoryResponse";

@Injectable({
    providedIn:"root"
})
export class CategoryService {
    httpClient: HttpClient = inject(HttpClient);


    getCategories () : Observable<CategoryResponse<Category[]>>{
        return this.httpClient.get<ResponseModel<CategoryResponse<Category[]>>>("https://localhost:8001/api/Category")
        .pipe(map(res=>res.data))
    }
}

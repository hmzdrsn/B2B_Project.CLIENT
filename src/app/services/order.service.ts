import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ResponseModel } from "./models/Response";
import { Order, OrderResponse } from "./models/OrderResponse";

@Injectable({
    providedIn:"root"
})
export class OrderService {
    httpClient: HttpClient = inject(HttpClient);


    getCompanyOrders () : Observable<OrderResponse<Order[]>>{
        return this.httpClient.get<ResponseModel<OrderResponse<Order[]>>>("https://localhost:7146/api/Order/GetOrdersByCompany")
        .pipe(map(res=>res.data))
    }
}

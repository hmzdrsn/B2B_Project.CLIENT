import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { ResponseModel } from "./models/Response";
import { Order, OrderResponse, UpdateOrder, UpdateOrderStatus, UserOrders } from "./models/OrderResponse";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class OrderService {
    _httpClient: HttpClient = inject(HttpClient);
    baseUrl: string;
    constructor() {
        this.baseUrl = environment.apiUrl;
    }
    getCompanyOrders(): Observable<OrderResponse<Order[]>> {
        return this._httpClient.get<ResponseModel<OrderResponse<Order[]>>>(`${this.baseUrl}api/Order/GetOrdersByCompany`)
            .pipe(map(res => res.data));
    }
    
    getOrderById(orderId: string): Observable<UpdateOrder> {
        return this._httpClient.get<ResponseModel<UpdateOrder>>(`${this.baseUrl}api/Order/GetOrderById?OrderId=` + orderId)
            .pipe(map(res => res.data));
    }
    
    updateOrderStatus(updateOrderStatus: UpdateOrderStatus) {
        return this._httpClient.post(`${this.baseUrl}api/Order/UpdateOrderStatus`, updateOrderStatus);
    }
    
    createOrder(): Observable<any> {
        return this._httpClient.post(`${this.baseUrl}api/Order/CreateOrder`, null)
            .pipe(map(res => res));
    }
    
    getOrdersByUser(): Observable<UserOrders[]> {
        return this._httpClient.get<ResponseModel<UserOrders[]>>(`${this.baseUrl}api/Order/GetUserOrders`)
            .pipe(map((res) => {
                return res.data;
            }));
    }
    
}

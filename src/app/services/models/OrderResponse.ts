export class OrderResponse<T>{
    orders: T
}

export class Order{
    name: string;
    totalprice: number;
    orderdate:Date;
    orderStatus:string;
}
// GetOrdersByCompany
// public string Name { get; set; }
// public decimal TotalPrice { get; set; }
// public DateOnly OrderDate{ get; set; }
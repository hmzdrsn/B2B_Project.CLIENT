export class OrderResponse<T>{
    orders: T
}

export class Order{
    orderId:string;
    name: string;
    totalPrice: number;
    orderDate:Date;
    orderStatus:string;
}

export class UpdateOrder{
    address:string;
    totalPrice:number;
    orderCode:string;
    orderDate:Date;
    orderStatus:string;
    orderDetails:UpdateOrderDetails[]
}

export class UpdateOrderDetails{
    quantity:number;
    unitPrice:number;
    productId:string;
    productName:string;
    productImageUrl:string;
}
export class UpdateOrderStatus{
    orderId:string;
    orderStatusId:string;
}
// GetOrdersByCompany
// public string Name { get; set; }
// public decimal TotalPrice { get; set; }
// public DateOnly OrderDate{ get; set; }
export class BasketItemResponse<T>{
    products: T[]
    totalPrice:number;
}


export class BasketItem{
    productId:string;
    productImageUrl:string;
    productName: string;
    quantity : number;
    price : number;
}
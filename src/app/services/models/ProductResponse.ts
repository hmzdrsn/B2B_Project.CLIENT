export class ProductResponse <T>{
    products : T;
}

export class Product{
    name: string;
    description: string;
    price: number;
    stock : number;
}
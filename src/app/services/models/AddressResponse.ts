export class AddressResponse<T>{
    addresses: T
}


export class Address{
    title:string;
    phone:string;
    fullName:string;
    addressId:string;
    address1:string;
    address2:string;
    city:string;
    state:string;
    country:string;
    postalCode:string;
    appUserId:string;
    isActive:boolean;
}
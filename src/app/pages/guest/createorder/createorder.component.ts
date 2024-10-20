import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BasketService } from '../../../services/basket.service';
import { GlobalmessageService } from '../../../services/globalmessage.service';
import { BasketItem } from '../../../services/models/BasketItemResponse';
import { NgFor } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../services/models/AddressResponse';
import { OrderService } from '../../../services/order.service';
import { OrderstatusService } from '../../../services/orderstatus.service';
@Component({
  selector: 'app-createorder',
  standalone: true,
  imports: [ButtonModule, StepperModule,RadioButtonModule,NgFor,InputMaskModule,InputTextModule],
  templateUrl: './createorder.component.html',
  styleUrl: './createorder.component.scss'
})
export class CreateorderComponent {
  basketService = inject(BasketService);
  addressService = inject(AddressService);
  orderService = inject(OrderService);
  messageService = inject(GlobalmessageService);

  basketItems :  BasketItem[] = [];
  address: Address[];
  totalPrice: number;
  ngOnInit(): void {
    this.basketService.getBasketItemsByUser().subscribe(res => {
      this.basketItems = res.products;
      this.basketItems.forEach(x => {
        if (!x.productImageUrl) {
          x.productImageUrl = ""
        }
        x.productImageUrl = x.productImageUrl.replace('wwwroot', '');
        x.productImageUrl = "https://localhost:8001" + x.productImageUrl
      })
      this.totalPrice = res.totalPrice;
    })
  }
  reduceQuantity(productId:string){
    console.log(productId);
    
    this.basketService.reduceQuantityFromBasket(productId)
    .subscribe(res=>{
      if(res){
        this.messageService.addMessage("contrast","","Miktar Azaltıldı");
        this.ngOnInit();
      }
    })
  }
  increaseQuantity(productId:string){
    console.log(productId);

    this.basketService.increaseQuantityFromBasket(productId)
    .subscribe(res=>{
      if(res){
        this.messageService.addMessage("contrast","","Miktar Arttırıldı");
        this.ngOnInit();
      }
    })
  }

  getAddresses(){
    this.addressService.getUserAddresses().subscribe(res=>{
      this.address = res;
    })
  }

  setAddress(e){
    console.log(e.target.id); //isactive true olacak address id'si 
    this.addressService.setAddressStatus(e.target.id).subscribe(res=>{
      if(res){
        this.getAddresses();
      }
    })
  }
  createOrder(){
    this.orderService.createOrder().subscribe(res=>{
      if(res){
        this.messageService.addMessage("success","",`${res.message}`);
      }
    })
  }
}

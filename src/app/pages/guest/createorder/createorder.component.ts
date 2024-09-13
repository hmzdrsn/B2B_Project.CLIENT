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
@Component({
  selector: 'app-createorder',
  standalone: true,
  imports: [ButtonModule, StepperModule,RadioButtonModule,NgFor,InputMaskModule,InputTextModule],
  templateUrl: './createorder.component.html',
  styleUrl: './createorder.component.scss'
})
export class CreateorderComponent {
  basketService = inject(BasketService);
  messageService = inject(GlobalmessageService);
  basketItems :  BasketItem[] = [];
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
}

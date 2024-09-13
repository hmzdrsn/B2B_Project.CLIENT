import { Component, inject, OnInit } from '@angular/core';
import { BasketService } from '../../../services/basket.service';
import { BasketItem } from '../../../services/models/BasketItemResponse';
import { NgFor } from '@angular/common';
import { GlobalmessageService } from '../../../services/globalmessage.service';

@Component({
  selector: 'app-basket-detail',
  standalone: true,
  imports: [NgFor],
  templateUrl: './basket-detail.component.html',
  styleUrl: './basket-detail.component.scss'
})
export class BasketDetailComponent implements OnInit{
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
    this.basketService.reduceQuantityFromBasket(productId)
    .subscribe(res=>{
      if(res){
        this.messageService.addMessage("contrast","","Miktar Azaltıldı");
        this.ngOnInit();
      }
    })
  }
  increaseQuantity(productId:string){
    this.basketService.increaseQuantityFromBasket(productId)
    .subscribe(res=>{
      if(res){
        this.messageService.addMessage("contrast","","Miktar Arttırıldı");
        this.ngOnInit();
      }
    })
  }
}

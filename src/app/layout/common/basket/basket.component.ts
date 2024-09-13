import { Component, inject, OnInit } from '@angular/core';
import { BasketService } from '../../../services/basket.service';
import { BasketItem } from '../../../services/models/BasketItemResponse';
import { NgFor } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { GlobalmessageService } from '../../../services/globalmessage.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  basketService = inject(BasketService);
  authService = inject(AuthService);
  messageService = inject(GlobalmessageService);

  basketItems: BasketItem[];
  totalPrice: number;
  ngOnInit(): void {
    let isAuthenticated = false;
    let jwtHelper: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem("token");
    if (token && !jwtHelper.isTokenExpired(token)) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }
    if (isAuthenticated) {

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
  }
  removeFromBasket(productId:string){
    this.basketService.removeProductFromBasket(productId).subscribe(res=>{
      if(res)
        this.messageService.addMessage("error",'Ürün Sepetten Çıkarıldı','');
        this.ngOnInit();
    })
    
  }
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Image, UpdateProductModel } from '../../../services/models/ProductResponse';
import { BasketService } from '../../../services/basket.service';
import { GlobalmessageService } from '../../../services/globalmessage.service';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [NgFor],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.scss'
})
export class ProductdetailComponent implements OnInit{
  productService  = inject(ProductService);
  basketService = inject(BasketService);
  messageService = inject(GlobalmessageService);

  selectedImage: string;
  productId: string;
  
  product : UpdateProductModel = new UpdateProductModel;
  images : Image[];

  constructor(activatedRoute: ActivatedRoute){
    activatedRoute.queryParams.subscribe(params=>{
      this.productId = params['productId'];
    })
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe(res=>{
      this.images = res.images;
      this.images.forEach(x=>{
        x.imageUrl = x.imageUrl.replace('wwwroot','');
        x.imageUrl = "https://localhost:8001"+x.imageUrl
      })
      this.selectedImage = this.images[0].imageUrl;
      this.product= res.product
    })
  }

  addProductToBasket(productId:string){
    this.basketService.addProductToBasket(productId).subscribe(res=>{
      if(res){
        this.messageService.addMessage("success",'Ürün Sepete eklendi','');
      }
    })
  }

  setMainImage(url:string){
    this.selectedImage = url;
  }
}

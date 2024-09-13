import { PaginatorModule } from 'primeng/paginator';
import { Component, inject, OnInit } from '@angular/core';
import { DefaultFilter } from '../../../services/models/ProductResponse';
import { ProductService } from '../../../services/product.service';
import { NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PaginatorModule, NgFor,CardModule,ButtonModule,RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  _productService = inject(ProductService);
  _router = inject(Router);
  totalItems: number;
  pageSize: number = 10;
  currentPage: number = 1;

  items: DefaultFilter[];

  ngOnInit(): void {
     this._productService.getProductsCount().subscribe(res=>{
       this.totalItems = res
     })
    this.loadProducts();
  }

  async processImageUrl(productUrl: string): Promise<string> {
    // Burada asenkron bir işlem yapılabilir, örneğin bir API çağrısı
    return new Promise((resolve) => {
      if (productUrl) {
        productUrl = productUrl.replace('wwwroot', '');
        resolve("https://localhost:8001" + productUrl);
      } else {
        resolve(productUrl);
      }
    });
  }

  async loadProducts() {
    try {
      const res = await this._productService.getProductByDefaultFilter(this.currentPage, this.pageSize).toPromise();
      for (const item of res) {
        if (item.productUrl) {
          item.productUrl = await this.processImageUrl(item.productUrl);
        }
      }
      this.items = res;
      console.log(this.items);
    } catch (err) {
      console.error('Ürünler yüklenirken bir hata oluştu:', err);
    }
  }

  onPageChange(event) {
    this.currentPage = event.page + 1;
    this.loadProducts();
  }

  routeProductDetail(productId:string){
    this._router.navigate(['/product-detail'],{queryParams:{productId:productId}})
  }
}

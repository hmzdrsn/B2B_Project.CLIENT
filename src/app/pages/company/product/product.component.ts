import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../services/models/ProductResponse';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
    templateUrl: './product.component.html',
    standalone: true,
    imports: [TableModule, DialogModule, RippleModule, 
      ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, 
      InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, 
      DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, 
      FormsModule, InputNumberModule,RouterModule],
    providers: [ConfirmationService],
})
export class ProductComponent implements OnInit{
  _productService : ProductService = inject(ProductService);

  productDialog: boolean = false;

  productList : Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  constructor( private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this._productService.getCompanyProducts().subscribe(
      (response) => {
        this.productList = response.products;
        console.log('Ürünler başarıyla alındı:', response.products);
      },
      (error) => {
        console.error('Ürünler alınırken hata oluştu:', error);
      }
    );
  }

  openNew() {
      this.product = {...this.product};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteselectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.productList = this.productList.filter((val) => !this.selectedProducts?.includes(val));
              this.selectedProducts = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  editproduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteproduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.productList = this.productList.filter((val) => val.name !== product.name);
              //this.product = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveproduct() {// GÜNCELLEME BURADA
      this.productDialog = false;
      // this.product içerisine doluyor.
      //UPDATE PRODUCT İŞLEMİ
  }


  
  @ViewChild('dt') dt!: Table;
  onFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.dt.filterGlobal(value, 'contains');
}

}
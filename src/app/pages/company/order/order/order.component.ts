import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
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
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../services/models/OrderResponse';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers:[MessageService, ConfirmationService]
})
export class OrderComponent implements OnInit {
 
   _orderService : OrderService = inject(OrderService);
  // ngOnInit(): void {
  //   this._orderService.getCompanyOrders().subscribe((response)=>{
  //     this.orderList = response.orders;
  //     console.log(this.orderList);
  //   },
  //   (error) => {
  //     console.error('Error fetching orders', error);
  //   })
  // }

  orderDialog: boolean = false;

  orders : Order[];

  order!: Order;

  selectedOrders!: Order[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor( private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      

      this.statuses = [
          { label: 'Sipariş Alındı', value: 'Sipariş Alındı' },
          { label: 'Sipariş Teslim Edildi', value: 'Sipariş Teslim Edildi' },
          { label: 'Sipariş Kargoya Verildi', value: 'shipped' },
          { label: 'Sipariş Onaylandı', value: 'approved' },
      ];
      
      this._orderService.getCompanyOrders().subscribe((response)=>{
             this.orders = response.orders;
             console.log(this.orders);
           },
           (error) => {
             console.error('Error fetching orders', error);
           })
  }

  openNew() {
      //this.order = {};
      this.submitted = false;
      this.orderDialog = true;
  }

  deleteselectedOrders() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.orders = this.orders.filter((val) => !this.selectedOrders?.includes(val));
              this.selectedOrders = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  editorder(order: Order) {
      this.order = { ...order };
      this.orderDialog = true;
  }

  deleteorder(product: Order) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.orders = this.orders.filter((val) => val.name !== product.name);
              //this.order = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.orderDialog = false;
      this.submitted = false;
  }

  saveorder() {
      this.submitted = true;

      if (this.order.name?.trim()) {
          if (this.order.name) {
              this.orders[this.findIndexById(this.order.name)] = this.order;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          } else {
              this.order.name = this.createId();
              this.order.name = 'product-placeholder.svg';
              this.orders.push(this.order);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }

          this.orders = [...this.orders];
          this.orderDialog = false;
          //this.order = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].name === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  getSeverity(status: string) : any{
      switch (status) {
          case 'Sipariş Alındı':
              return 'danger';
          case 'Sipariş Onaylandı':
              return 'warning';
          case 'Sipariş Kargoya Verildi':
              return 'danger';
          case 'Sipariş Teslim Edildi':
              return 'danger';    
      }
  }

}
import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../../../services/order.service';
import { Order, UpdateOrder, UpdateOrderDetails, UpdateOrderStatus } from '../../../../services/models/OrderResponse';
import {FormsModule} from '@angular/forms';
import { OrderstatusService } from '../../../../services/orderstatus.service';
import { DropdownModule } from 'primeng/dropdown';
import { Status } from '../../../../services/models/OrderStatusResponse';
import { GlobalmessageService } from '../../../../services/globalmessage.service';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TableModule, CommonModule,TagModule,ButtonModule,DialogModule,InputTextModule,FormsModule ,DropdownModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers:[MessageService]
})
export class OrderComponent implements OnInit {
  _orderService : OrderService = inject(OrderService);
  _orderStatusService: OrderstatusService= inject(OrderstatusService);
  _messageService : GlobalmessageService = inject(GlobalmessageService);
  visible: boolean = false;

  orderStatuses: Status[];
  selectedStatus :Status;
  orders :Order[];
  updateOrderModel :UpdateOrder = new UpdateOrder();
  updateOrderDetail : UpdateOrderDetails[];
  

  constructor(){
    registerLocaleData(localeTr);
  }
  ngOnInit(): void {
    this._orderService.getCompanyOrders().subscribe(res=>{
      this.orders = res.orders;
    })
  }
  selectedOrderId:string;
  editOrder(x: string) {
    this.selectedOrderId = x;
    this._orderService.getOrderById(x).subscribe(res=>{
      this.updateOrderModel = res;
      this._orderStatusService.getAll().subscribe(res=>{
        this.orderStatuses = res.status
        
      })
    this.showDialog();

    })
  }
  onSubmit(){
    let statusModel: UpdateOrderStatus = new UpdateOrderStatus()
    statusModel.orderId = this.selectedOrderId
    statusModel.orderStatusId = this.selectedStatus.id
    let res = this._orderService.updateOrderStatus(statusModel).subscribe(res=>{
      this.hideDialog()
      window.location.reload();
      
    },err=>{
      this._messageService.addMessage('error','Hata!',`${this.selectedStatus.status}`)
    })
  }
  showDialog() {
      this.visible = true;
  }
  hideDialog(){
    this.visible = false;
  }
  selectStatus(){
    
  }
  getSeverity(event):any{
    let severity = 'info';
    switch(event){
        case 'Sipariş Alındı':{
            severity = 'danger'
            break;
        }
        case 'Sipariş Teslim Edildi': {
            severity = 'success'
            break;
        }
        case 'Sipariş Kargoya Verildi': {
          severity = 'info'
          break;
        }
        case 'Sipariş Onaylandı': {
          severity = 'warning'
          break;
        }
    }
    return severity;
  }
}
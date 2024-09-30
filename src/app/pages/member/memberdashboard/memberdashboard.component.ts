import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../../services/order.service';
import { UserOrders } from '../../../services/models/OrderResponse';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-memberdashboard',
  standalone: true,
  imports: [ButtonModule,NgFor,DatePipe],
  templateUrl: './memberdashboard.component.html',
  styleUrl: './memberdashboard.component.scss'
})
export class MemberdashboardComponent {
  orderService = inject(OrderService);
  orders :UserOrders[] = [];    
  constructor(){
    this.orderService.getOrdersByUser().subscribe(res=>this.orders = res);
  }
}

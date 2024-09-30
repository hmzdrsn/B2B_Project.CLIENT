import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../../services/order.service';
import { UserOrders } from '../../../services/models/OrderResponse';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}

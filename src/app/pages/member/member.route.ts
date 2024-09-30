import { Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberdashboardComponent } from './memberdashboard/memberdashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { MessagesComponent } from './messages/messages.component';

export const memberRoutes: Routes = [
    {
        path:'',component:MemberComponent,
        children:[
            {
                path:'',component:MemberdashboardComponent
            },
            {
                path:'orders',component:OrdersComponent
            },
            {
                path:'messages',component:MessagesComponent
            }
        ]
    }
];

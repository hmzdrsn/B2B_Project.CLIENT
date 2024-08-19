import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { CompanyComponent } from './company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order/order.component';
import { AddproductComponent } from './addproduct/addproduct.component';

export const companyRoutes: Routes = [
    {
        path:'', component : CompanyComponent,
        children:[
            {
                path:'',component:DashboardComponent,
            },
            {
                path:'dashboard',component:DashboardComponent,
            },
            {
                path:'product', component: ProductComponent
            },
            {
                path:'product/addproduct', component:AddproductComponent
            },
            {
                path:'product/:id',component:ProductdetailComponent
            },
            {
                path:'order', component: OrderComponent
            }
        ]
    },
    
];

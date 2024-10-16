import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from '../../layout/guest/content/content.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { BasketDetailComponent } from './basket-detail/basket-detail.component';
import { CreateorderComponent } from './createorder/createorder.component';
import { RegisterComponent } from './register/register.component';

export const guestRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: '', component: ContentComponent },
            { path: 'product-detail', component: ProductdetailComponent },
            { path: 'basket-detail', component: BasketDetailComponent },
            { path: 'create-order', component: CreateorderComponent },
        ]
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'login', component: LoginComponent
    }
];

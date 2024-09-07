import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from '../../layout/guest/content/content.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';

export const guestRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: '', component: ContentComponent },
            { path: 'product-detail', component: ProductdetailComponent },
        ]
    },
    {
        path: 'login', component: LoginComponent
    }
];

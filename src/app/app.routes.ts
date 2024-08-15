import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/components/error/error.component';
import { GuestComponent } from './pages/guest/guest.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {   path:'',
        loadChildren : ()=> import('../app/pages/guest/guest.route').then(g=>g.guestRoutes),
    },
    {
        path: 'company',
        loadChildren :()=> import('../app/pages/company/company.routes').then(c=>c.companyRoutes),
        canActivate:[AuthGuard]
    },
     {
         path:'**',
         component : ErrorComponent,
     }
];

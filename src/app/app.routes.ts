import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/components/error/error.component';
import { CompanyGuard } from './guards/company.guard';

export const routes: Routes = [
    {   path:'',//guest
        loadChildren : ()=> import('../app/pages/guest/guest.route').then(g=>g.guestRoutes),
    },
    {
        path: 'company',
        loadChildren :()=> import('../app/pages/company/company.routes').then(c=>c.companyRoutes),
        canActivate:[CompanyGuard]
    },
    {
        path: 'member',
        loadChildren :()=> import('../app/pages/member/member.route').then(c=>c.memberRoutes)
    },
    {
        path:'**',
        component : ErrorComponent,
    }
];

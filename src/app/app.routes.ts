import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/guest/error/error.component';
import { CompanyGuard } from './guards/company.guard';
import { MemberGuard } from './guards/member.guard';

export const routes: Routes = [
    {   path:'',//guest
        loadChildren : ()=> import('../app/pages/guest/guest.route').then(g=>g.guestRoutes),
    },
    {
        path: 'company',
        loadChildren :()=> import('../app/pages/company/company.routes').then(c=>c.companyRoutes),
        canActivate:[]
    },
    {
        path: 'member',
        loadChildren :()=> import('../app/pages/member/member.route').then(c=>c.memberRoutes),
        canActivate:[MemberGuard]
    },
    {
        path:'**',
        component : ErrorComponent,
    }
];

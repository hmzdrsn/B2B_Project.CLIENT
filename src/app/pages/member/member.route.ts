import { Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberdashboardComponent } from './memberdashboard/memberdashboard.component';

export const memberRoutes: Routes = [
    {
        path:'',component:MemberComponent,
        children:[
            {
                path:'',component:MemberdashboardComponent
            }
        ]
    }
];

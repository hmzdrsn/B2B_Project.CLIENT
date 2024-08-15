import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  hello:string ="";
  constructor() {
    const jwthelper = new JwtHelperService();
    const token = jwthelper.decodeToken(localStorage.getItem('token'))
    this.hello = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
  }
}

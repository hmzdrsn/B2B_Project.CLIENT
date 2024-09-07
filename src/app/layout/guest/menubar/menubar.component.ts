import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    MenubarModule, 
    BadgeModule, 
    AvatarModule, 
    InputTextModule, 
    RippleModule, 
    CommonModule,
    RouterModule,
    BasketComponent,
    NgIf
  ],
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  items: any[] | undefined;
  _authService = inject(AuthService);
  roles: string[] = [];

  constructor() {
    const jwthelper = inject(JwtHelperService);
    const token = jwthelper.decodeToken(localStorage.getItem('token'));
    const rolesClaim = token ? token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : [];
  
    // Eğer rolesClaim bir dizi değilse, onu diziye çevirin
    this.roles = Array.isArray(rolesClaim) ? rolesClaim : [rolesClaim];
  }
  

  async ngOnInit() {
    const isCompany = this.roles.some(x => x === "Company");
    const isMember = this.roles.some(x => x === "Member");
    const isGuest = this.roles.length < 1;

    console.log(isMember, isCompany, isGuest);

    if (isCompany) {
      this.items = [
        {
          label: 'Hesabım',
          icon: 'pi pi-user',
          routerLink: '/member',
        },
        {
          label: 'Favorilerim',
          icon: 'pi pi-heart'
        },
        {
          label: 'Sepetim',
          icon: 'pi pi-shopping-cart'
        },
        {
          label: 'Şirket Paneli',
          icon: 'pi pi-briefcase',
          routerLink: '/company',
        }
      ];
    } else if (isGuest) {
      this.items = [
        {
          label: 'Giriş Yap',
          icon: 'pi pi-user',
          routerLink: '/login',
        },
        {
          label: 'Favorilerim',
          icon: 'pi pi-heart'
        },
        {
          label: 'Sepetim',
          icon: 'pi pi-shopping-cart',
          basket:true
        }
      ];
    } else if (isMember) {
      this.items = [
        {
          label: 'Hesabım',
          icon: 'pi pi-user',
          routerLink: '/member',
        },
        {
          label: 'Favorilerim',
          icon: 'pi pi-heart'
        },
        {
          label: 'Sepetim',
          icon: 'pi pi-shopping-cart',
        }
      ];
    }
  }
}

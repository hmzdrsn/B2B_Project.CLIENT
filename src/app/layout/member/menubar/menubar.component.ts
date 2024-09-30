import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [ MenubarModule, 
    BadgeModule, 
    AvatarModule, 
    InputTextModule, 
    RippleModule, 
    CommonModule,
    RouterModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {
  items: any[] | undefined;
  _authService = inject(AuthService)

  constructor() {
    this.items = [
      {
        label: 'Profilim',
        icon: 'pi pi-user',
        routerLink: '/login',
      },
      {
        label: 'Siparişlerim',
        icon: 'pi pi-shopping-bag',
        routerLink:'/member/orders'
      },
      {
        label: 'Mesajlar',
        icon: 'pi pi-envelope',
        routerLink:'/member/messages'
      },
      {
        label: 'Çıkış Yap',
        icon: 'pi pi-sign-out',
        action: ()=>this.signOut(),
      }
    ];
  }

  signOut(){
    this._authService.logOut();
  }
  
}

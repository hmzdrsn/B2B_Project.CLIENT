import { Component, inject, OnInit } from '@angular/core';
import {  NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { CompanyComponent } from './pages/company/company.component';
import { LoginComponent } from './pages/guest/login/login.component';
import { GuestComponent } from './pages/guest/guest.component';
import { AuthService } from './services/auth.service';
import { ToastModule } from 'primeng/toast';
import { GlobalmessageService } from './services/globalmessage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule,RouterOutlet,NgIf,LoginComponent,CompanyComponent,GuestComponent,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers :[MessageService,GlobalmessageService]
})
export class AppComponent implements OnInit{
  pageMode = 2;
  constructor(private _authService: AuthService) {}
  async ngOnInit() {
    //await this._authService.authControl(); // Asenkron olarak authControl çağırıyoruz
    if (this._authService.isAuthenticated) {
      this.pageMode = 1; // Oturum açmışsa CompanyComponent'i göster
    } else {
      this.pageMode = 2; // Oturum açmamışsa GuestComponent'i göster
    }
  }
  
}

import { Component, inject, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import {  RouterModule} from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GlobalmessageService } from '../../../services/globalmessage.service';
@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MegaMenuModule, ButtonModule, CommonModule, AvatarModule,RouterModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
  providers:[AuthService]
})
export class MenubarComponent {
  items: any[] | undefined;
    messageService = inject(GlobalmessageService);
    constructor(private authService:AuthService) {
        
    }
  ngOnInit() {
      this.items = [
          {
              label: 'Anasayfa',
              routerLink:"/company",
              icon:'pi pi-home',
              root: true,
          },
          {
            label:'Ürünler',
            root:true,
            routerLink:"/company/product",
            icon:'pi pi-list',
            items:[
                {
                  label:'Ürün Ekle',
                  icon: 'pi pi-plus',
                  subtext: '',
                  routerLink:"/company/product/addproduct"
                }
                    // {
                    //     items: [
                    //         { label: 'Ürün Ekle', icon: 'pi pi-plus', subtext: '',routerLink:"/company/product/addproduct" },
                    //     ]
                    // }
                
            ]
          },
          {
            label: 'Siparişler',
            routerLink:"/company/order",
            icon:'pi pi-cart-arrow-down',
            basket:true,
            root: true,
          },
          {
            label: 'İndirimlerim',
            routerLink:"/company/discount",
            icon:'pi pi-percentage',
            root: true,
          },
      ];
  }

  logOut(){
    this.authService.logOut();
    this.messageService.addMessage('error', '','Çıkış Yapıldı')
  }
}

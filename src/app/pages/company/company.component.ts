import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductComponent } from "./product/product.component";
import { ProductdetailComponent } from "./productdetail/productdetail.component";
import { MenubarComponent } from "../../layout/menubar/menubar.component";
import { GlobalmessageService } from "../../services/globalmessage.service";
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [RouterOutlet,MenubarComponent],
  template:`
  <app-menubar></app-menubar>
  <router-outlet></router-outlet>
  `,
  providers:[]
})
export class CompanyComponent {

}

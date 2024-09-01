import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductComponent } from "./product/product.component";
import { ProductdetailComponent } from "./productdetail/productdetail.component";
import { GlobalmessageService } from "../../services/globalmessage.service";
import { ToastModule } from "primeng/toast";
import { MenubarComponent } from "../../layout/company/menubar/menubar.component";

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

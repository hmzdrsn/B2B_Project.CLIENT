import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarComponent } from "../../layout/member/menubar/menubar.component";

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [RouterModule, MenubarComponent],
  template:`
  <app-menubar></app-menubar>
  <router-outlet></router-outlet>
  `
})
export class MemberComponent {

}

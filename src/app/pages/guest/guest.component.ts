import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from "../../layout/guest/menubar/menubar.component";

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [RouterOutlet, MenubarComponent],
  template:`
  <router-outlet></router-outlet>
  `
})
export class GuestComponent {

}

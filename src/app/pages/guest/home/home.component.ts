import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarComponent } from '../../../layout/guest/menubar/menubar.component';
import { CategorybarComponent } from '../../../layout/guest/categorybar/categorybar.component';
import { ContentComponent } from '../../../layout/guest/content/content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,MenubarComponent,CategorybarComponent,ContentComponent],
  template:`
  <app-menubar></app-menubar>
  <app-categorybar></app-categorybar>
  <!-- <app-content></app-content> -->
   <router-outlet></router-outlet>
  `
})
export class HomeComponent {

}

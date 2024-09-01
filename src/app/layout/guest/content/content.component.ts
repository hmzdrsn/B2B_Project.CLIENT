import { Component } from '@angular/core';
import { FilterComponent } from '../../../pages/guest/filter/filter.component';
import { ProductsComponent } from '../../../pages/guest/products/products.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [FilterComponent,ProductsComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}

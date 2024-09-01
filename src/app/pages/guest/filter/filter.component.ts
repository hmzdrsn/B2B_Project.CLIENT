import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [DropdownModule,ReactiveFormsModule, InputTextModule,CheckboxModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  value: string;
  categories : any[] = [
    {name:"Kategori 1"},
    {name:"Kategori 2"},
    {name:"Kategori 3"},
  ]
}

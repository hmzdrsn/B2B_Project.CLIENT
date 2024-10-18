import { Component, inject, OnInit, runInInjectionContext } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../services/models/CategoryResponse';
import { ProductRequest } from '../../../services/models/ProductRequest';
import { ProductService } from '../../../services/product.service';
import { LoginComponent } from '../../guest/login/login.component';
import { HttpClient } from '@angular/common/http';
import { GlobalmessageService } from '../../../services/globalmessage.service';
import { DarkModeService } from '../../../services/dark-mode.service';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    CardModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit  {
 _categoryService : CategoryService = inject(CategoryService);
 _productService : ProductService = inject(ProductService);
 _messageService = inject(GlobalmessageService);
 darkModeService = inject(DarkModeService);
 isDarkMode :boolean=false;
  productForm!: FormGroup;
  categories : Category[] = [];
  files: File[] = [];

  productModel : ProductRequest = new ProductRequest();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
    
    this._categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response.categories;
        console.log('Kategoriler başarıyla alındı:', response.categories);
      },
      (error) => {
        console.error('Kategoriler alınırken hata oluştu:', error);
      }
    );
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]], // En az 3 karakter uzunluğunda olmalı
      description: ['', [Validators.required, Validators.minLength(20)]], // En az 20 karakter uzunluğunda olmalı
      price: [null, [Validators.required, Validators.min(0)]], // Fiyat gerekli ve negatif olamaz
      productCode: ['', [Validators.required, Validators.pattern('^[A-Z0-9_-]{3,10}$')]], 
      stock: [null, [Validators.required, Validators.min(0), Validators.max(10000)]],
      categoryId: [null, [Validators.required]], // Kategori ID'si zorunlu
      productImages: [null, [Validators.required]] 
    });
    
  }
  get name(){
    return this.productForm.get("name");
  }
  get description(){
    return this.productForm.get("description");
  }
  get price(){
    return this.productForm.get("price");
  }
  get productCode(){
    return this.productForm.get("productCode");
  }
  get stock(){
    return this.productForm.get("stock");
  }
  get categoryId(){
    return this.productForm.get("categoryId");
  }

  onSelect(event: any) {
    // Seçilen dosyaları al ve sakla
    let file= event.files[0];
    this.files.push(file)
    console.log(this.files);
    
  }
  onRemove(event: any) {
    // Kaldırılan dosyayı listeden çıkar
    this.files = this.files.filter(file => file.name !== event.file.name);
    console.log(this.files);
  }
  onUpload($event:any){
    console.log("onUpload");
  }
  submitForm(): void {
    if(this.productForm.valid){
      const formData = new FormData();
      const price = this.productForm.value['price'].toString().replace('.',',')
      console.log(price);
      // Form alanlarını FormData'ya ekle
      formData.append("Name",this.productForm.value['name'])
      formData.append("Description",this.productForm.value['description'])
      formData.append("Price", price)
      formData.append("ProductCode",this.productForm.value['productCode'])
      formData.append("Stock",this.productForm.value['stock'])
      formData.append("CategoryId",this.productForm.value['categoryId'].id)
      formData.append("Username","anan")
      this.files.forEach(file => formData.append('ProductImages', file));
      
    console.log(formData.get('ProductImages'));
    this._productService.createProduct(formData);
    }else{
      this._messageService.addMessage("error","","Giriş değerlerinizi kontrol ediniz!")
    }
  }
}

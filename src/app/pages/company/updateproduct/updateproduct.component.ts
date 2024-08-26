import { ChangeDetectorRef, Component, inject, NgModule, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../services/models/CategoryResponse';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Image, ProductResponse2 } from '../../../services/models/ProductResponse';
import { ImageService } from '../../../services/image.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-updateproduct',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    CardModule,
    FormsModule,
    ToastModule
  ],
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.scss'
})
export class UpdateproductComponent implements OnInit {
  _categoryService : CategoryService = inject(CategoryService);
  _productService : ProductService = inject(ProductService);
  _imageService : ImageService = inject(ImageService);

  productForm: FormGroup;
  productId: string;
  
  Images : Image[] =[];
  productImages = [];
  files : File [] = [];
  
  selectedCategory: Category = new Category;
  categories: Category[] = []; // tüm kategoriler
  productResponse : ProductResponse2; //gelen product

  constructor(private fb: FormBuilder,private activatedRoute : ActivatedRoute,private cdr: ChangeDetectorRef) {
   activatedRoute.queryParams.subscribe(params=>{
    this.productId = params['productId']
   })
  }

  ngOnInit(): void {
    //1
    this._categoryService.getCategories().subscribe(res => {
      this.categories = res.categories;
    });
    //2
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [null],
      productCode: [''],
      stock: [null],
      categoryId: [null],
      productImages: [null]
    });

    //3
    this._productService.getProductById(this.productId).subscribe(res => {
      this.productResponse = res;
      
      this.selectedCategory = res.product.category;

      this.Images = res.images;

      this.Images.forEach(x=>{
        x.imageUrl = x.imageUrl.replace('wwwroot','');
        x.imageUrl = "https://localhost:8001"+x.imageUrl
      })
      //4
      this.productForm.patchValue({
        name: this.productResponse.product.name,
        description: this.productResponse.product.description,
        price: this.productResponse.product.price,
        productCode: this.productResponse.product.productCode,
        stock: this.productResponse.product.stock,
        categoryId: this.productResponse.product.categoryId,
      })
      
    });
  
   
  }
  file : File;

  submitForm(): void {
    const formData = new FormData();
    const price = this.productForm.value['price'].toString().replace('.',',')

    formData.append("ProductId",this.productResponse.product.id)
    formData.append("Name",this.productForm.value['name'] ?? '')
    formData.append("Description",this.productForm.value['description']?? '')
    formData.append("Price", price ?? '')
    formData.append("ProductCode",this.productForm.value['productCode']?? '')
    formData.append("Stock",this.productForm.value['stock']?? '')
    formData.append("CategoryId",this.productForm.value['categoryId'].id ?? this.selectedCategory.id)
    this.files.forEach(file => formData.append('ProductImages', file));
    
  this._productService.updateProduct(formData);
}
onSelect(event: any) {
  // Seçilen dosyaları al ve sakla
  let file= event.files[0];
  this.files.push(file)
}
onRemove(event: any) {
  // Kaldırılan dosyayı listeden çıkar
  this.files = this.files.filter(file => file.name !== event.file.name);
}
onDelete(imageId){
    this.Images = this.Images.filter(x=>x.id!==imageId);
    this._imageService.deleteImage(imageId);
  }
  
}
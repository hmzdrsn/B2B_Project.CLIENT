import { Component, inject, OnInit } from '@angular/core';
import { DiscountService } from '../../../services/discount.service';
import { Discount, ProductDiscount, UserDiscount } from '../../../services/models/DiscountResponse';
import { CommonModule, DatePipe, NgFor, NgIf, registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { GlobalmessageService } from '../../../services/globalmessage.service';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../services/models/ProductResponse';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from '../../../services/product.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { DarkModeService } from '../../../services/dark-mode.service';
@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, InputTextModule, InputNumberModule, CalendarModule, ButtonModule, ReactiveFormsModule, DialogModule, DropdownModule, ConfirmDialogModule, FormsModule, ReactiveFormsModule, TableModule,CommonModule],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
  providers: [ConfirmationService],
})
export class DiscountComponent implements OnInit {
  discountService = inject(DiscountService);
  productService = inject(ProductService);
  messageService = inject(GlobalmessageService);
  darkModeService = inject(DarkModeService);
  _confirmationService = inject(ConfirmationService);
  discounts: Discount[] = [];
  discountForm: FormGroup;
  discount: Discount = new Discount();
  userDiscounts: UserDiscount[];
  productDiscounts: ProductDiscount[];
  isDarkMode :boolean=false;
  constructor(private formBuilder: FormBuilder) {
    registerLocaleData(localeTr);
    this.assignForm = this.formBuilder.group({
      selectedProduct: null
    });
  }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });

    this.discountService
      .getUserDiscounts()
      .subscribe(res => {
        this.userDiscounts = res
      })
    this.discountService
      .getProductDiscounts()
      .subscribe(res => {
        this.productDiscounts = res
      })

    this.discountForm = this.formBuilder.group(
      {
        discountCode: [this.discount.discountCode, Validators.required],
        discountAmount: [this.discount.discountAmount, [Validators.required]],
        isPercentage: [false, Validators.required],
        validFrom: [this.discount.validFrom, Validators.required],
        validUntil: [this.discount.validUntil, Validators.required],
        maxUsagePerUser: [this.discount.maxUsagePerUser, [Validators.required, Validators.min(1)]],
      },
      { validators: dateRangeValidator } // Tarih karşılaştırma validatörü
    );

    this.loadDiscounts(); // Mevcut indirimleri yükleme fonksiyonuna ayırdık.
  }

  loadDiscounts(): void {
    this.discountService.getCompanyDiscounts().subscribe((res) => {
      this.discounts = res;
    });
  }

  onSubmit() {

    if (this.discountForm.valid) {
      this.discount = this.discountForm.value;
      //Date Local zamana cevirme islemi UTC to yerrel zaman dilimi, backend yerel karsiliyor.
      // Tarihleri UTC'ye dönüştürmeden yerel tarih formatında tutmak.
      const validFrom = new Date(this.discount.validFrom);
      const validUntil = new Date(this.discount.validUntil);

      // YYYY-MM-DDTHH:mm:ss formatında string'e çevirme
      this.discount.validFrom =
        `${validFrom.getFullYear()}-${(validFrom.getMonth() + 1).toString().padStart(2, '0')}-${validFrom.getDate().toString().padStart(2, '0')}T${validFrom.getHours().toString().padStart(2, '0')}:${validFrom.getMinutes().toString().padStart(2, '0')}:${validFrom.getSeconds().toString().padStart(2, '0')}`;

      this.discount.validUntil =
        `${validUntil.getFullYear()}-${(validUntil.getMonth() + 1).toString().padStart(2, '0')}-${validUntil.getDate().toString().padStart(2, '0')}T${validUntil.getHours().toString().padStart(2, '0')}:${validUntil.getMinutes().toString().padStart(2, '0')}:${validUntil.getSeconds().toString().padStart(2, '0')}`;

      console.log(this.discount.validFrom);
      console.log(this.discount.validUntil);

      this.discountService.createDiscount(this.discount).subscribe((res) => {
        if (res.status === "true") {
          this.messageService.addMessage('success', '', 'İndirim Eklendi');
          this.discounts.push(this.discount);
          this.discountForm.reset();
        } else {
          this.messageService.addMessage('error', '', res.message);
        }
      });
    } else {
      this.messageService.addMessage('error', '', 'giris degerlerinizi kontrol ediniz');
    }
  }

  removeDiscount(discountId: string) {
    this._confirmationService.confirm({
      message: 'Ürünlere ve kullanıcılara ait indirimlerde silinecektir onaylıyor musun?',
      header: 'Dikkat!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.discountService.removeDiscount(discountId).subscribe(res => {
          if (res.status === "true") {
            this.messageService.addMessage('error', '', 'İndirim Silindi');
            this.discounts = this.discounts.filter(x => x.discountId !== discountId);
          } else {
            this.messageService.addMessage('error', 'Hata', res.message);
          }
        })
      }
    });


  }

  //ürüne inidirm ata
  assignForm: FormGroup;
  displayAssignDialog = false;
  selectedDiscountId = "";
  selectedProduct: Product;
  products: Product[] = [];
  openAssignDialog(discountID: string) {
    this.displayAssignDialog = true;
    this.selectedDiscountId = discountID;
    console.log("secilen inidirm" + this.selectedDiscountId);
  }
  getProducts(discountID: string) {
    this.productService.getCompanyProducts().subscribe(res => {
      this.products = res.products;
      this.openAssignDialog(discountID);
    })
  }
  onAssignDiscount() {
    this.selectedProduct = this.assignForm.value['selectedProduct'];
    console.log(this.selectedProduct);

    this.discountService.assignDiscountToProduct(this.selectedDiscountId, this.selectedProduct.productId).subscribe(res => {
      if (res.status === "true") {
        this.messageService.addMessage('success', '', 'İndirim Eklendi');
        this.displayAssignDialog = false;
      } else {
        this.messageService.addMessage('error', '', res.message);
      }
    })
  }


  displayAssignUserDialog = false;
  usernameToAssign: string;
  openAssignUserDiscountDialog(discountID: string) {
    this.displayAssignUserDialog = true;
    this.selectedDiscountId = discountID;

  }
  onAssignUserDiscount() {
    this.discountService.assignDiscountToUser(this.selectedDiscountId, this.usernameToAssign)
      .subscribe(res => {
        if (res.status === "true") {
          this.messageService.addMessage('success', '', 'İndirim Kullanıcıya Atandı')
        } else {
          this.messageService.addMessage('error', '', res.message);
        }
      })
  }

  removeUserDiscount(userDiscountId: string) {
    this.discountService.removeUserDiscount(userDiscountId)
      .subscribe(res => {
        if (res.status === "true") {
          this.messageService.addMessage('success', '', 'İndirim Kaldırıldı');
          this.userDiscounts = this.userDiscounts.filter(x => x.userDiscountId != userDiscountId);
        } else {
          this.messageService.addMessage('success', '', res.message);
        }
      })
  }
  removeProductDiscount(productDiscountId:string){
    this.discountService.removeProductDiscountById(productDiscountId)
    .subscribe(res => {
      if (res.status === "true") {
        this.messageService.addMessage('success', '', 'İndirim Kaldırıldı');
        this.productDiscounts = this.productDiscounts.filter(x => x.productDiscountId != productDiscountId);
      } else {
        this.messageService.addMessage('success', '', res.message);
      }
    })
  }

}

// Custom validator: validFrom tarihi, validUntil tarihinden büyükse hata döner
export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const validFrom = control.get('validFrom')?.value;
  const validUntil = control.get('validUntil')?.value;

  return validFrom && validUntil && validFrom > validUntil ? { dateRangeInvalid: true } : null;
};

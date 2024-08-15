import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { GlobalmessageService } from '../../../services/globalmessage.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ButtonModule,ReactiveFormsModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[AuthService,GlobalmessageService]
})
export class LoginComponent {
  frm:FormGroup;
  loading: boolean = false;

  messageService = inject(GlobalmessageService);
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    ){
    this.frm = formBuilder.group({
      username:[""],
      password:[""]
    })
  }


  onSubmit() {
    this.loading=true;
    // Burada API'ye istek
    this.authService.login(this.frm);

    this.authService.loading$.subscribe(loading => {
      this.loading = loading;
    });
    this.show();
  }

  show() {
    this.messageService.addMessage('success', '','Giriş Yapıldı')
  }
}
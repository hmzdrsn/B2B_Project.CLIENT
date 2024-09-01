import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { GlobalmessageService } from '../../../services/globalmessage.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ButtonModule,ReactiveFormsModule,ToastModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[AuthService,GlobalmessageService]
})
export class LoginComponent {
  frm:FormGroup;
  loading: boolean = false;

  messageService = inject(GlobalmessageService);
  router = inject(Router);
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    ){
    this.frm = formBuilder.group({
      username:[""],
      password:[""]
    })
  }


  async onSubmit() {
    this.loading=true;
    // Burada API'ye istek
    const res = await this.authService.login(this.frm);

    await this.authService.loading$.subscribe(loading => {
      this.loading = loading;
    });
    
    if(res){
      this.router.navigateByUrl('/');
      this.messageService.addMessage('success', '','Giriş Yapıldı')
    }
    else{
      this.messageService.addMessage('error','','Giriş Başarısız')
      
    }
  }
}
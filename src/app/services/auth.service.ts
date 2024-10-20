import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable(); // Observable olarak expose edin
  isAuthenticated: boolean = false;
  roles : any[] = [];
  private httpClient = inject(HttpClient)
  private router: Router = inject(Router);
  baseUrl : string;
  constructor(){
    this.baseUrl = environment.apiUrl;
  }
  async login(frm: FormGroup) : Promise<boolean>{
    this.loadingSubject.next(true); // İstek başlamadan önce loading'i true yapın
    try {
        const res = await this.httpClient.post<any>(`${this.baseUrl}api/User/Login`, frm.value).toPromise();
        
        localStorage.setItem("token", res.data.token.accessToken);

        // authControl'u çağırıp, ardından yönlendirme yapıyoruz.
        await this.authControl();

        // authControl sonrası isAuthenticated kontrolü
        if (this.isAuthenticated) {
            return true;
        } else {
            // Giriş başarısız ise yapılacak işlemler (isteğe bağlı)
            console.error('Giriş başarısız.');
            return false;
        }
    } catch (error) {
        // Hata durumunda yapılacak işlemler
        console.error('Login hatası:', error);
        return false;
    } finally {
        this.loadingSubject.next(false); // İstek tamamlandığında veya hata olduğunda loading'i false yapın
    }
}

  logOut(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login")
  }

  async authControl() {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem("token");
    
    // Önce rolleri alıyoruz
    await this.getUserRoles();
    
    // Token'in geçerli olup olmadığını kontrol ediyoruz
    if (token && !jwtHelper.isTokenExpired(token)) {
        this.isAuthenticated = true;
    } else {
        this.isAuthenticated = false;
    }
    }

  getUserRoles(): Promise<any> {
      return new Promise((resolve, reject) => {
          this.httpClient.get<any[]>(`${this.baseUrl}api/Role/GetUserRoles`)
          .subscribe(res => {
              this.roles = res;
              resolve(res);
          }, err => {
              reject(err);
          });
      });
  }

  
  public async getRoles() : Promise<any[]> {
    if (this.roles.length === 0) {
      // Eğer roller yüklenmemişse, rolleri yükleme islemi
      await this.getUserRoles();
    }
    return this.roles;
  }
}
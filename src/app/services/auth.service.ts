import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable(); // Observable olarak expose edin

  isAuthenticated: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(frm: FormGroup) {
    this.loadingSubject.next(true); // İstek başlamadan önce loading'i true yapın
    this.httpClient.post<any>("https://localhost:8001/api/User/Login", frm.value).subscribe(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token.accessToken);

        // authControl'u çağırıp, ardından yönlendirme yapıyoruz.
        this.authControl();

        // authControl sonrası isAuthenticated kontrolü
        if (this.isAuthenticated) {
            this.router.navigateByUrl("/company");
        } else {
            // Giriş başarısız ise yapılacak işlemler (isteğe bağlı)
            console.error('Giriş başarısız.');
        }
        this.loadingSubject.next(false); // İstek tamamlandığında loading'i false yapın
    }, error => {
        // Hata durumunda yapılacak işlemler
        console.error('Login hatası:', error);
        this.loadingSubject.next(false); // Hata durumunda da loading'i false yapın
    });
  }

  authControl() {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem("token");

    // Token'in geçerli olup olmadığını kontrol ediyoruz
    if (token && !jwtHelper.isTokenExpired(token)) {
        this.isAuthenticated = true;
    } else {
        this.isAuthenticated = false;
    }
  }

  logOut(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login")
}
}

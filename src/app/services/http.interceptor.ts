import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          console.log("Yetkisiz Erişim");
          this._authService.logOut();
        }
        else if(error.status===HttpStatusCode.Forbidden){
          this._authService.logOut();
          console.log("Erişiminiz Yasal Değil");
        }
        return throwError(() => error);
      })
    );
  }
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalmessageService } from './globalmessage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) {}
  messageService = inject(GlobalmessageService);
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
          console.log("Unauthorized calisti");
          this._authService.logOut();
          this.messageService.addMessage('success', '','Giriş Yapıldı')
        }
        return throwError(() => error);
      })
    );
  }
}

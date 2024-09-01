import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.authService.authControl();
        const isAuthenticated = this.authService.isAuthenticated;
        
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }

        return isAuthenticated;
    }
}
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  isMember:boolean =false; 
  isCompany: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.authService.authControl();

    this.isMember = this.authService.roles.some(x=>x=="Member");
    this.isCompany= this.authService.roles.some(x=>x=="Company");
    
    if (this.authService.isAuthenticated && this.isMember || this.isCompany) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const currentUser = this.authService.currentUserValue;
    
    if (currentUser) {
      // Check if the user is trying to access an admin route and has admin role
      if (next.routeConfig?.path === 'admin-dashboard' && currentUser.role !== 'admin') {
        this.router.navigate(['/user-dashboard']);
        return false;
      }
      return true;
    }

    // Redirect to login if not authenticated
    this.router.navigate(['/login']);
    return false;
  }
}

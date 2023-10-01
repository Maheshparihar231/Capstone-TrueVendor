import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../authentication/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  
  if(inject(AuthService).isLoggedIn()) return true;
  inject(Router).navigate(['/login'])
  return false;
};

export const LoginGuard:CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn()) return true;
  return false;
};

export const RoleGuard:CanActivateFn = (route, state) => {
  
  if(localStorage.getItem('userRole') == 'Vendor') {
    inject(Router).navigate(['/controlpanel'])
    return false
  }
  return true;
};


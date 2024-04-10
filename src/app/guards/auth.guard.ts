import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService=inject(AuthService);
  let router=inject(Router);
  if(authService.checkLogin()){
    // router.navigateByUrl('/',{skipLocationChange:true,replaceUrl:true})
    return true;
  }
  else
  {
    router.navigate(['/login'])
    return false
  }
};

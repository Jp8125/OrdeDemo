import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const preventGuard: CanActivateFn = (route, state) => {
  let auth=inject(AuthService)
  let router=inject(Router)
  if (auth.checkLogin())  {
    if(auth.isAdmin()){
      router.navigate(['/admin'])
    }
    else
    {
      router.navigate(['/user'])
    }
   return false
  }
  else
  {
    return true
  }
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let auth=inject(AuthService)
  let router=inject(Router)
  if(auth.isAdmin()){
    return true;
  }
  else
  {
    router.navigateByUrl('/')
    return false;
  }
};

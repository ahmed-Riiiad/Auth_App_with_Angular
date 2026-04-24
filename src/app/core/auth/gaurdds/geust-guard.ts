import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const geustGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  if (localStorage.getItem("freshToken")){
    return router.parseUrl('/home');
  }else{
    return true
  }
};

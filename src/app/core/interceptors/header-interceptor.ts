import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('freshToken')){
    req = req.clone({
      setHeaders : {
        Authorization :`Bearer ${localStorage.getItem('freshToken')}`, 
      }
    })
  }
  return next(req);
};

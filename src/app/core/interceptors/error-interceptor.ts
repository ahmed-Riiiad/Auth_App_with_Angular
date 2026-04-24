import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const  toastrService = inject(ToastrService)
  console.log('Interceptor triggered'); // 👈 هنا أول مكان
  return next(req).pipe(
    catchError((err)=>{
      console.log('Error caught in interceptor');
    const message = err?.error?.message || 'Unexpected error';

    toastrService.error(message, 'Error ❌', {
      progressBar: true,
      closeButton: true
    });
  
  return throwError(()=>err)
  }))
};

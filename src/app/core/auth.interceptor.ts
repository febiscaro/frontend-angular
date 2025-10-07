import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const access = localStorage.getItem('access');

  if (access) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${access}` } });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.removeItem('access');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};

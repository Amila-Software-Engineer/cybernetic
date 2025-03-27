import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const myToken = localStorage.getItem("lsmtoken")
  const cloneRequest = req.clone({
      setHeaders:{
          Authorization: `Bearer ${myToken}`
      }
   }
  )
   return next(cloneRequest);
};

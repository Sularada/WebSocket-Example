import type { HttpInterceptorFn } from '@angular/common/http';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

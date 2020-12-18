import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorServiceService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt: string = localStorage.getItem("jwt");
    if(jwt){
      console.log(jwt);
      req = req.clone({
        setHeaders: {
          auth: jwt
        }
      })
    }
    console.log("Getting in interceptor");
    return next.handle(req);
  }
}

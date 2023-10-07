import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if (request.url.includes("https://route-ecommerce.onrender.com/api/v1/auth/signin")|| request.url.includes("https://route-ecommerce.onrender.com/api/v1/auth/signup")) {
      this._loaderService.hide()
    } else {
      this._loaderService.show()
    }

    console.log(request);
    
    let newRequest = request.clone({
      headers: request.headers.set("token", `${localStorage.getItem("userToken")}`)
    })
    return next.handle(newRequest).pipe(
      finalize(() => this._loaderService.hide())
    );
  }
}

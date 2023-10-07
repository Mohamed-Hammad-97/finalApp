import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private _httpClient: HttpClient) { }
  
  forgotPassword(data:any): Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,data)
  }

  resetCode(data: any): Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, data)
  }

  restPassword(data: any): Observable<any> {
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, data)
  }
}

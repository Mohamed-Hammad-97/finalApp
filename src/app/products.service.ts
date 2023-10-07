import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient: HttpClient) { }
  
  getProducts(pageNum:number = 1): Observable <any> {
    return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/products?page=${pageNum}`)
  }

  getProductById(id:string): Observable<any> {
    return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
  }

  getCategories(): Observable<any> {
    return this._httpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  getBrands(pageNum: number = 1): Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${pageNum}`)
  }

}

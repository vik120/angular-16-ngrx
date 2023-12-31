import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';
import { Product } from '../type/product.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private persistance: PersistanceService, private router: Router) { }

  getProducts(): Observable<Product[]> {
    const url = environment.apiUrl + 'products'
    return this.http.get(url).pipe(
      map((response: any) => {
        return response
      })
    )
  }

  getSingleProduct(id: number): Observable<Product> {
    const url = environment.apiUrl+'products/'+id
    return this.http.get(url).pipe(
      map((response: any) => {
        return response
      })
    )
  }

  addNewProduct(data): Observable<any>{
    const url = environment.apiUrl+'products'
    return this.http.post(url, data['request']).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
}

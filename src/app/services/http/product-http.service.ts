import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {
  private baseUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) { }

  list(page: number): Observable < {data: Array<Product>, meta: any} > {
    const token = window.localStorage.getItem('token');
    const params = new HttpParams({
      fromObject: {
        page: page + ''
      }
    });

    return this.http.get < {data: Array<Product>, meta: any} >(this.baseUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params
    });
  }
}

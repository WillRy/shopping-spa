import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model';
import {map} from 'rxjs/operators';
import { HttpResource } from './http-resource';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {
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

  get(id: number): Observable < Product > {
    const token = window.localStorage.getItem('token');
    return this.http.get < {data: Product} > (`${this.baseUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(response => response.data)
    );
  }

  create(data: Product): Observable< Product > {
    const token = window.localStorage.getItem('token');
    return this.http.post< Product >(this.baseUrl, data, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
  }

  update(id: number, data: Product): Observable < Product > {
    const token = window.localStorage.getItem('token');
    return this.http.put < {data: Product} > (`${this.baseUrl}/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(response => response.data)
    );
  }

  destroy(id: number): Observable < any > {
    const token = window.localStorage.getItem('token');
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model';
import {map} from 'rxjs/operators';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {
  private baseUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient, private authService: AuthService) { }

  list(searchParams: SearchParams): Observable < {data: Array<Product>, meta: any} > {
    const token = this.authService.getToken();

    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });

    return this.http.get < {data: Array<Product>, meta: any} >(this.baseUrl, {
      params
    });
  }

  get(id: number): Observable < Product > {
    return this.http.get < {data: Product} > (`${this.baseUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(data: Product): Observable< Product > {
    return this.http.post< Product >(this.baseUrl, data);
  }

  update(id: number, data: Product): Observable < Product > {
    return this.http.put < {data: Product} > (`${this.baseUrl}/${id}`, data).pipe(
      map(response => response.data)
    );
  }

  destroy(id: number): Observable < any > {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

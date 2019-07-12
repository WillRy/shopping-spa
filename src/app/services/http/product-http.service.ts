import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model';
import {map} from 'rxjs/operators';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product> {
  private baseUrl = `${environment.api.url}/products`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  list(searchParams: SearchParams): Observable < {data: Array<Product>, meta: any} > {
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
    const formData = this.formDataToSend(data);
    return this.http.post< Product >(this.baseUrl, formData);
  }

  update(id: number, data: Product): Observable < Product > {
    const formData = this.formDataToSend(data);
    formData.append('_method', 'PUT');
    return this.http.post < {data: Product} > (`${this.baseUrl}/${id}`, formData).pipe(
      map(response => response.data)
    );
  }

  destroy(id: number): Observable < any > {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  private formDataToSend(data: Product): FormData {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', <any>data.price);
    if (data.photo) {
      formData.append('photo', data.photo);
    }
    return formData;
  }

}

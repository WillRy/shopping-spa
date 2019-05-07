import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService implements HttpResource<User> {
  private baseUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable < {data: Array<User>, meta: any} > {
    const token = window.localStorage.getItem('token');

    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    });

    return this.http.get < {data: Array<User>, meta: any} >(this.baseUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params
    });
  }

  get(id: number): Observable < User > {
    const token = window.localStorage.getItem('token');
    return this.http.get < {data: User} > (`${this.baseUrl}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(response => response.data)
    );
  }

  create(data: User): Observable< User > {
    const token = window.localStorage.getItem('token');
    return this.http.post< User >(this.baseUrl, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  update(id: number, data: User): Observable < User > {
    const token = window.localStorage.getItem('token');
    return this.http.put < {data: User} > (`${this.baseUrl}/${id}`, data, {
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

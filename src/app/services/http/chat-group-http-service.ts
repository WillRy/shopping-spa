import { ChatGroup } from './../../model';
import {
    Injectable
  } from '@angular/core';
  import {
    HttpClient, HttpParams
  } from '@angular/common/http';
  import {
    Observable
  } from 'rxjs/internal/Observable';
  import { Category } from 'src/app/model';
  import {map} from 'rxjs/operators';
  import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';
  import { AuthService } from '../auth.service';
  import { environment } from 'src/environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class ChatGroupHttpService implements HttpResource<ChatGroup> {

    private baseUrl = `${environment.api.url}/chat_groups`;

    constructor(private http: HttpClient, private authService: AuthService) {}

    list(searchParams: SearchParams): Observable < {data: Array<ChatGroup>, meta: any} > {
      const sParams = new SearchParamsBuilder(searchParams).makeObject();
      const params = new HttpParams({
        fromObject: (<any>sParams)
      });

      return this.http.get < {data: Array<ChatGroup>, meta: any} > (this.baseUrl, {
        params
      });
    }

    get(id: number): Observable < ChatGroup > {
      return this.http.get < {data: ChatGroup} > (`${this.baseUrl}/${id}`).pipe(
        map(response => response.data)
      );
    }

    create(data: ChatGroup): Observable < ChatGroup >  {
      const formData = this.formDataToSend(data);
      return this.http.post < {data: ChatGroup} > (this.baseUrl, formData).pipe(
        map(response => response.data)
      );
    }

    update(id: number, data: ChatGroup): Observable < ChatGroup > {
      const formData = this.formDataToSend(data);
      formData.append('_method', 'PATCH');
      return this.http.put < {data: ChatGroup} > (`${this.baseUrl}/${id}`, formData).pipe(
        map(response => response.data)
      );
    }

    destroy(id: number): Observable < any > {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }

    private formDataToSend(data): FormData {
      const formData = new FormData();
      formData.append('name', data.name);
      if (data.photo instanceof File) {
        formData.append('photo', data.photo);
      }
      return formData;
    }

  }

import { ChatGroupLinkInvitation } from './../../model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory, ChatGroup, User } from 'src/app/model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { SearchParams, SearchParamsBuilder } from './http-resource';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupLinkInvHttpService {

    private baseAPI = `${environment.api.url}`;
    constructor(private http: HttpClient, private authService: AuthService) { }

// tslint:disable-next-line: max-line-length
    list(chatGroupId: number, searchParams: SearchParams): Observable<{data: {chat_group: ChatGroup, link_invitations: Array<ChatGroupLinkInvitation>}, meta: any}> {
      const sParams = new SearchParamsBuilder(searchParams).makeObject();
      const params = new HttpParams({
        fromObject: (<any>sParams)
      });
    // tslint:disable-next-line: max-line-length
      return this.http.get < {data: {chat_group: ChatGroup, link_invitations: Array<ChatGroupLinkInvitation>}, meta: any} >(this.getBaseUrl(chatGroupId), {
        params
      });
    }

    // create(chatGroupId: number, usersId: number[]): Observable<{chat_group: ChatGroup, users: User[] } > {
    //   // tslint:disable-next-line: max-line-length
    //   return this.http.post <{ data: { chat_group: ChatGroup, users: User[] } }> (this.getBaseUrl(chatGroupId), {users: usersId}).pipe(
    //     map(response => response.data)
    //   );
    // }

    // destroy(chatGroupId: number, usersId: number): Observable<any> {
    //   return this.http.delete(this.getBaseUrl(chatGroupId, usersId));
    // }

    private getBaseUrl(chatGroupId: number, userId: number = null): string {
      let baseUrl = `${this.baseAPI}/chat_groups/${chatGroupId}/link_invitations`;
      if (userId) {
        baseUrl += `/${userId}`;
      }
      return baseUrl;
    }

}

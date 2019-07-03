import { ChatGroupLinkInvitation, ChatInvitationUser, ChatInvitationUserStatus } from './../../model';
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
export class ChatInvUserHttpService {

    private baseAPI = `${environment.api.url}`;
    constructor(private http: HttpClient, private authService: AuthService) { }

    // tslint:disable-next-line: max-line-length
    list(chatGroupId: number, searchParams: SearchParams): Observable<{data: {group: ChatGroup, invitations: ChatInvitationUser[]}, meta: any}> {
      const sParams = new SearchParamsBuilder(searchParams).makeObject();
      const params = new HttpParams({
        fromObject: (<any>sParams)
      });
      // tslint:disable-next-line: max-line-length
      return this.http.get < {data: {group: ChatGroup, invitations: ChatInvitationUser[]}, meta: any} >(this.getBaseUrl(chatGroupId), {
        params
      });
    }

    get(chatGroupId: number, invitationId: number): Observable < ChatInvitationUser > {
      return this.http.get < {data: ChatInvitationUser} > (`${this.getBaseUrl(chatGroupId, invitationId)}`).pipe(
        map(response => response.data)
      );
    }

    update(chatGroupId: number, invitationId: number, status: ChatInvitationUserStatus): Observable<ChatGroupLinkInvitation> {
      // tslint:disable-next-line: max-line-length
      return this.http.patch <{ data: ChatGroupLinkInvitation}> (this.getBaseUrl(chatGroupId, invitationId), {status}).pipe(
        map(response => response.data)
      );
    }


    private getBaseUrl(chatGroupId: number, invitationId: number = null): string {
      let baseUrl = `${this.baseAPI}/chat_groups/${chatGroupId}/invitations`;
      if (invitationId) {
        baseUrl += `/${invitationId}`;
      }
      return baseUrl;
    }

}

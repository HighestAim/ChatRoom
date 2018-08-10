import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import IResponseModel from '../models/IResponseModel';
import IChatRoomModel from '../models/IChatRoomModel';
import { UsersService } from './users.service';
import IMessageModel from '../models/IMessageModel';
// import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ChatRoomService {

  private urlPrefix = 'ChatRooms/';

  constructor(private http: HttpClient, private userService: UsersService) {
    this.urlPrefix = environment.domain + this.urlPrefix;
  }

  public getChatRooms(): Observable<IResponseModel<IChatRoomModel[]>> {
    const url = `${this.urlPrefix}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.userService.signedUser.token}` });
    // headers.append('Authorization', `Bearer ${this.userService.signedUser.token}`);
    // const options = new RequestOptions({headers});
    console.log('before get');
    return this.http.get<IResponseModel<IChatRoomModel[]>>(url, {headers})
      .pipe(
        catchError(this.handleError())
      );
  }

  public addChatRoom(chatRoomName: string): Observable<IResponseModel<IChatRoomModel>> {
    const url = `${this.urlPrefix}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.userService.signedUser.token}` });
    // headers.append('Authorization', `Bearer ${this.userService.signedUser.token}`);
    // const options = new RequestOptions({headers});
    return this.http.post<IResponseModel<IChatRoomModel>>(url, '"' + chatRoomName + '"', {headers})
      .pipe(
        catchError(this.handleError())
      );
  }

  public getChatRoomMessages(chatRoomId: number): Observable<IResponseModel<IMessageModel[]>> {
    const url = `${this.urlPrefix}${chatRoomId}/Messages`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.userService.signedUser.token}` });
    // const options = new RequestOptions({headers});
    return this.http.get<IResponseModel<IMessageModel[]>>(url, {headers})
      .pipe(
        catchError(this.handleError())
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

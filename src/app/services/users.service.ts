import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs/index';
import IRegistrationModel from '../models/IRegistrationModel';
import IResponseModel from '../models/IResponseModel';
import { environment } from '../../environments/environment.prod';
import { catchError } from 'rxjs/internal/operators';
import ILoginModel from '../models/ILoginModel';
import IUserAuthentificationModel from '../models/IUserAutenthificationModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  private urlPrefix = 'Users/';
  public signedUser: IUserAuthentificationModel;
  public storageKey = 'authData';

  constructor(private http: HttpClient) {
    this.urlPrefix = environment.domain + this.urlPrefix;
  }

  registerUser(data: IRegistrationModel): Observable<IResponseModel<null>> {
    const url = `${this.urlPrefix}register`;
    return this.http.post<IResponseModel<null>>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError())
      );
  }

  loginUser(data: ILoginModel): Observable<IResponseModel<IUserAuthentificationModel>> {
    const url = `${this.urlPrefix}authenticate`;
    return this.http.post<IResponseModel<IUserAuthentificationModel>>(url, data, httpOptions)
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

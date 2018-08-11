import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs/index';
import IRegistrationModel from '../models/IRegistrationModel';
import IResponseModel from '../models/IResponseModel';
import { environment } from '../../environments/environment.prod';
import { catchError } from 'rxjs/internal/operators';
import ILoginModel from '../models/ILoginModel';
import IUserAuthenticationModel from '../models/IUserAuthenticationModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  private urlPrefix = 'Users/';
  public signedUser: IUserAuthenticationModel;
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

  loginUser(data: ILoginModel): Observable<IResponseModel<IUserAuthenticationModel>> {
    const url = `${this.urlPrefix}authenticate`;
    return this.http.post<IResponseModel<IUserAuthenticationModel>>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError())
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      return of(result as T);
    };
  }
}

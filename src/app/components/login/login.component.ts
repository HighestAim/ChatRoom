import { Component, OnDestroy, OnInit } from '@angular/core';
import ILoginModel from '../../models/ILoginModel';
import { PopupMessagesService } from '../../services/popup-messages.service';
import { UsersService } from '../../services/users.service';
import { EResponseStatus } from '../../enums/EResponseStatus';
import { popupTitle } from '../../constants/popup-title.constant';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs/index';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginData: ILoginModel = {
    userName: '',
    password: ''
  };
  private subscriptions: Array<Subscription> = [];
  constructor(private popupMessageService: PopupMessagesService, private userService: UsersService,
                private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

  login(): void {
    if (this.loginData.userName && this.loginData.password) {
      this.subscriptions.push(
      this.userService.loginUser(this.loginData).subscribe(response => {
        if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
          this.popupMessageService.show(popupTitle.ERROR, 'Login failed.');
        } else {
          this.localStorageService.saveInLocalStorage(this.userService.storageKey, response.result);
          this.userService.signedUser = response.result;
        }
      }));
    } else {
      this.popupMessageService.show(popupTitle.ERROR, 'Wrong Username or Password. Try again.');
    }
  }

  logout(): void {
    this.userService.signedUser = undefined;
    this.localStorageService.saveInLocalStorage(this.userService.storageKey, '');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}

import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import IRegistrationModel from '../../models/IRegistrationModel';
import {UsersService} from '../../services/users.service';
import { EResponseStatus } from '../../enums/EResponseStatus';
import { PopupMessagesService } from '../../services/popup-messages.service';
import { popupTitle } from '../../constants/popup-title.constant';
import { Subscription } from 'rxjs/index';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

@Injectable({ providedIn: 'root' })
export class RegistrationComponent implements OnInit, OnDestroy {

  registrationData: IRegistrationModel = {
    firstName: '',
    lastName: '',
    userName: '',
    password: ''
  };
  private subscriptions: Array<Subscription> = [];

  constructor(private popupMessageService: PopupMessagesService, private userService: UsersService) { }

  ngOnInit() {
  }

  register(): void {
    if (this.registrationData.password
      && this.registrationData.userName
      && this.registrationData.firstName
      && this.registrationData.lastName) {
      this.subscriptions.push(
      this.userService.registerUser(this.registrationData).subscribe(result => {
        if (!result || !result.status || result.status !== EResponseStatus.Ok || result.errorMessage) {
          this.popupMessageService.show(popupTitle.ERROR, 'Registration failed.');
        } else {
          this.popupMessageService.show(popupTitle.SUCCESS, 'Registration success!');
        }
      })
    );
    } else {
      this.popupMessageService.show(popupTitle.INFO, 'Fill empty fields.');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}

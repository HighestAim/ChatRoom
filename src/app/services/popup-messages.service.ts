import { Injectable } from '@angular/core';
import { popupTitle } from '../constants/popup-title.constant';

@Injectable({
  providedIn: 'root'
})
export class PopupMessagesService {
  public message = '';
  public title = popupTitle.INFO;

  constructor() { }

  show(title = popupTitle.INFO, message: string) {
    this.message = message;
    this.title = title;
  }

  hide() {
    this.message = '';
  }
}

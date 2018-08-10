import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat-room';
  public localStorageData: any = [];

  constructor(private usersService: UsersService, private localStorageService: LocalStorageService) {
    // chatService.messages.subscribe(msg => {
    //   console.log("Response from websocket: " + msg);
    // });
  }

  ngOnInit() {
    const storageData = this.localStorageService.getFromLocalStorage(this.usersService.storageKey);
    if (storageData) {
      this.usersService.signedUser = storageData.authData;
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { LocalStorageService } from './services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public router: Router, public usersService: UsersService, public localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    const storageData = this.localStorageService.getFromLocalStorage(this.usersService.storageKey);
    if (storageData) {
      this.usersService.signedUser = storageData.authData;
    }
  }
}

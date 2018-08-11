import { Inject, Injectable } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public localStorageData: any = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }

  saveInLocalStorage(key, val): void {
    this.storage.set(key, val);
    this.localStorageData[key] = this.storage.get(key);
  }

  getFromLocalStorage(key): any {
    this.localStorageData[key] = this.storage.get(key);
    return this.localStorageData;
  }
}

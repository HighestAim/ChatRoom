import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ChatRoomsComponent } from './components/chat-rooms/chat-rooms.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PopupMessagesComponent } from './components/popup-messages/popup-messages.component';
import { ClickStopPropagation } from './directives/disableClick';
import { StorageServiceModule} from 'angular-webstorage-service';
import { ChatRoomService } from './services/chat-room.service';
import { UsersService } from './services/users.service';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ChatRoomsComponent,
    ChatMessagesComponent,
    PopupMessagesComponent,
    ClickStopPropagation
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [ ChatRoomService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

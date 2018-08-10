import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomsComponent } from './components/chat-rooms/chat-rooms.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'rooms', component: ChatRoomsComponent },
  { path: 'messages/:id', component: ChatMessagesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

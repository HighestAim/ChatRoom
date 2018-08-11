import { Component, OnDestroy, OnInit } from '@angular/core';
import IChatRoomModel from '../../models/IChatRoomModel';
import { ChatRoomService } from '../../services/chat-room.service';
import { Subscription } from 'rxjs/index';
import { EResponseStatus } from '../../enums/EResponseStatus';
import { PopupMessagesService } from '../../services/popup-messages.service';
import { popupTitle } from '../../constants/popup-title.constant';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit, OnDestroy {

  chatRooms: IChatRoomModel[];
  private subscriptions: Array<Subscription> = [];
  selectedChatRoom: IChatRoomModel;
  newChatRoomName: string;

  constructor(private popupMessageService: PopupMessagesService, private chatRoomService: ChatRoomService) { }

  ngOnInit() {
    this.getChatRooms();
  }

  onSelectRoom(chatRoom: IChatRoomModel): void {
    this.selectedChatRoom = chatRoom;
  }

  addChatRoom() {
    if (!this.newChatRoomName) {
      this.popupMessageService.show(popupTitle.ERROR, 'Chat room name is wrong.');
    }
    this.subscriptions.push(
      this.chatRoomService.addChatRoom(this.newChatRoomName).subscribe(response => {
        if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
          this.popupMessageService.show(popupTitle.ERROR, 'Can\'t add chat room.');
        } else {
          if (response.result && response.result.id && response.result.name) {
            this.chatRooms.push(response.result);
          }
        }
      })
    );
  }

  getChatRooms(): void {
    this.subscriptions.push(
      this.chatRoomService.getChatRooms().subscribe(response => {
        if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
          this.popupMessageService.show(popupTitle.ERROR, 'Can\'t get chat rooms.');
        } else {
          this.chatRooms = response.result;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}

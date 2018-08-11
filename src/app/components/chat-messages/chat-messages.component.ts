import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/index';
import IChatRoomModel from '../../models/IChatRoomModel';
import { ChatRoomService } from '../../services/chat-room.service';
import { PopupMessagesService } from '../../services/popup-messages.service';
import { popupTitle } from '../../constants/popup-title.constant';
import { EResponseStatus } from '../../enums/EResponseStatus';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import IMessageModel from '../../models/IMessageModel';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit, OnDestroy {

  chatRooms: IChatRoomModel[];
  private subscriptions: Array<Subscription> = [];
  selectedChatRoom: IChatRoomModel;
  messages: IMessageModel[];
  routedChatRoomId?: number;
  messageText = '';

  constructor(private popupMessageService: PopupMessagesService, private chatRoomService: ChatRoomService,
              private route: ActivatedRoute, public userService: UsersService, private chatService: ChatService) {
    this.subscriptions.push(chatService.messages.subscribe(msg => {
      this.messages.push(msg);
    }));
  }

  ngOnInit() {
    this.routedChatRoomId = +this.route.snapshot.paramMap.get('id');
    this.getChatRoomAndMessages();
  }

  sendMessage(message: string) {
    if (message) {
      const sendMessage: IMessageModel = {
        chatRoomId: this.routedChatRoomId,
        userId: this.userService.signedUser.id,
        messageText: message,
        userName: this.userService.signedUser.firstName
      };
      this.chatService.messages.next(sendMessage);
      this.messageText = '';
    }
  }


  onEnter(message: string) {
    this.sendMessage(message);
  }

  onSelectRoom(chatRoom: IChatRoomModel): void {
    this.selectedChatRoom = chatRoom;
    this.getChatMessages(chatRoom.id);
  }

  getChatRoomAndMessages(): void {
    this.subscriptions.push(
      this.chatRoomService.getChatRooms().subscribe(response => {
        if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
          this.popupMessageService.show(popupTitle.ERROR, 'Can\'t get chat rooms.');
        } else {
          this.chatRooms = response.result;
          this.selectedChatRoom = this.chatRooms.find(value => value.id === this.routedChatRoomId);
          if (this.chatRooms && this.chatRooms.length > 0 && this.routedChatRoomId) {
            this.getChatMessages(this.routedChatRoomId);
        }
      }})
    );
  }

  getChatMessages(chatRoomId?: number): void {
    if (chatRoomId) {
      this.subscriptions.push(
        this.chatRoomService.getChatRoomMessages(chatRoomId).subscribe(response => {
          if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
            this.popupMessageService.show(popupTitle.ERROR, 'Can\'t get chat room messages.');
          } else {
            this.messages = response.result;
          }
        }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}

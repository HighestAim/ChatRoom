import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import IMessageModel from '../models/IMessageModel';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ChatService {
  public messages: Subject<IMessageModel>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<IMessageModel>>wsService
      .connect(environment.wsDomain)
      .map((response: MessageEvent): IMessageModel => {

        const data = JSON.parse(response.data);
        return {
          userId: data.UserId,
          chatRoomId: data.ChatRoomId,
          messageText: data.MessageText,
          sentDate: data.SentDate,
          userName: data.UserName
        };
      });
  }
}

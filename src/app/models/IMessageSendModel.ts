interface IMessageSendModel {
  userId: number;
  chatRoomId?: number;
  messageText: string;
  sentDate?: Date | string | number;
}

export default IMessageSendModel;

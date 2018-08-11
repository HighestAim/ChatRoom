interface IMessageModel {
  userId?: number;
  userName?: string;
  chatRoomId?: number;
  messageText?: string;
  sentDate?: Date | string;
}

export default IMessageModel;

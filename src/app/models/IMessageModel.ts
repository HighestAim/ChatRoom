interface IMessageModel {
  userId: number;
  userName: number;
  chatRoomId?: number;
  chatRoomName: string;
  messageText: string;
  sentDate: Date | string;
}

export default IMessageModel;

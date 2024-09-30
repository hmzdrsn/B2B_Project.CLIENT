export class SendMessageRequest{
    receiverId:string;
    content:string;
}

export class MessagesResponse{
    senderId:string;
    receiverId:string;
    content:string;
    date:Date;
}
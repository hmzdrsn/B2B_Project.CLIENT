import { Component, ElementRef, inject, OnInit, runInInjectionContext, ViewChild, ViewContainerRef } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from '../../../services/message.service';
import { MessagesResponse, SendMessageRequest } from '../../../services/models/MessageRequest';
import { GlobalmessageService } from '../../../services/globalmessage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { UserMessageModel } from '../../../services/models/UserResponse';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor,NgIf,ScrollPanelModule,ProgressSpinnerModule,NgClass],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  messageService = inject(MessageService);
  userService = inject(UserService);
  globMessageService = inject(GlobalmessageService);
  jwthelper = inject(JwtHelperService);


  req: SendMessageRequest = new SendMessageRequest();
  private hub: signalR.HubConnection;
  Messages: MessagesResponse[] = [];
  UserList: UserMessageModel[] = [];
  selectedUser: UserMessageModel = new UserMessageModel ();
  @ViewChild("messageInput") _messageInput:ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    const token = this.jwthelper.decodeToken(localStorage.getItem('token'));
    const name = token ? token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : '';
    this.hub = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:8001/chathub", {
        accessTokenFactory: () => name
      })
      .build();

    this.hub.start()
      .then(() => {
        console.log("Bağlantı başarılı!");
        this.hub?.invoke("Connect", name);
        // Bağlantı kurulduktan sonra mesaj dinleyicisini ayarlayın
        this.hub.on('receiveMessage', (res) => {
          console.log("Yeni mesaj alındı: ", res);
          if(this.selectedUser.userId==res.senderId){
            let msg : MessagesResponse = new MessagesResponse()
            msg.content= res.content;
            msg.receiverId = res.receiverId;
            msg.senderId = res.senderId;
            this.Messages.push(msg)
          }
        });

        this.hub.on('statusChanged', () => {
          this.userService.getUsers().subscribe(res => {
            this.UserList = res
            this.selectedUser = res[0];
          })
        });

        this.userService.getUsers().subscribe(res => {
          this.UserList = res
          this.selectedUser = res[0];
        })
      })
      .catch(err => console.log("Bağlanti kurulurken hata ile karsilasildi! : " + err));
  }
  selectUser(userId: string) {
    this.selectedUser = this.UserList.find(x => x.userId == userId);
    this.messageService.getMessages(10, 1,userId).subscribe(res => {
      this.Messages = res.reverse();
    })
  }

  sendMessage(content: string) {
    this.req.receiverId = this.selectedUser.userId;
    this.req.content = content;
    this.messageService.sendMessage(this.req).subscribe(res => {
      let msg : MessagesResponse = new MessagesResponse()
      msg.content= content;
      msg.receiverId = this.selectedUser.userId;
      this.Messages.push(msg)
      this._messageInput.nativeElement.value ='';
    }, err => {
      this.globMessageService.addMessage('error', '', 'Mesaj Gönderilemedi!')
    });
  }


  getMessage(receiverId:string) {
    this.messageService.getMessages(5, 1,receiverId).subscribe(res => {
      this.Messages = res;
    })
  }



  loading: boolean = false;

  onScroll(event: any) {
    const element = event.target;
    const scrollTop = element.scrollTop;

    
    // En üste ulaşıldığında
    if (scrollTop === 0) {
      console.log("Scroll position:", scrollTop);
      this.triggerLoading();
    }
  }

  triggerLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      // Yeni mesajlar yüklenebilir
    }, 2000);  // 2 saniyelik loading simülasyonu
  }
}

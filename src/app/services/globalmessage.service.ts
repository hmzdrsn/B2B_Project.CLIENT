import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class GlobalmessageService {
  _messageService : MessageService;
  constructor(messageService : MessageService) {
    this._messageService = messageService;
  }

  addMessage(severity: string, summary: string, detail: string) {
    this._messageService.add({ severity, summary, detail, sticky:false, life:500 });
  }
}

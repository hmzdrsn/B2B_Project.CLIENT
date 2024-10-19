import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MessagesResponse, SendMessageRequest } from "./models/MessageRequest";
import { catchError, map, Observable, of, pipe } from "rxjs";
import { ResponseModel } from "./models/Response";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn:"root"
})
export class MessageService {
    _httpClient: HttpClient = inject(HttpClient);

    baseUrl : string;
  constructor(){
    this.baseUrl = environment.apiUrl;
  }

  sendMessage(req: SendMessageRequest): Observable<boolean> {
    return this._httpClient.post<boolean>(`${this.baseUrl}api/Message/SendMessage?receiverId=${req.receiverId}&content=${req.content}`, req)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
  
  getMessages(size: number, currentOrder: number, receiverId: string): Observable<MessagesResponse[]> {
    return this._httpClient.get<ResponseModel<MessagesResponse[]>>(`${this.baseUrl}api/Message/GetMessagesByDefaultFilter?size=${size}&currentOrder=${currentOrder}&receiverId=${receiverId}`)
      .pipe(map((res) => res.data));
  }
  
}

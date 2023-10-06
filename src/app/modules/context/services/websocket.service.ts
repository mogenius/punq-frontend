import { Injectable } from '@angular/core';
import { environment } from '@pq/environments/environment';
import { AuthService } from '@pq/user/services/auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private _socket: WebSocket;

  constructor(private readonly _authService: AuthService) {}

  connect(
    namespace: string,
    pod: string,
    container: string): Subject<MessageEvent> {
    const url = `wss://punq.mogenius.dev/websocket/exec-sh?namespace=${namespace}&podname=${pod}&container=${container}&token=${this._authService.tokenValue}`;
    console.log(url);
    this._socket = new WebSocket(url);

    const observable = new Observable((obs) => {
      this._socket.onmessage = obs.next.bind(obs);
      this._socket.onerror = obs.error.bind(obs);
      this._socket.onclose = obs.complete.bind(obs);
      return this._socket.close.bind(this._socket);
    });

    const observer = {
      next: (data: MessageEvent) => {
        if (this._socket.readyState === WebSocket.OPEN) {
          console.log('Sending message:', data);
          this._socket.send(data.data);
        }
      },
    };

    return Subject.create(observer, observable);
  }
}

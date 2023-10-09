import { Injectable } from '@angular/core';
import { environment } from '@pq/environments/environment';
import { AuthService } from '@pq/user/services/auth.service';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private _socket: WebSocket;

  constructor(private readonly _authService: AuthService) {}

  connect(
    namespace: string,
    pod: string,
    container: string
  ): Promise<Subject<Event>> {
    const url = `wss://punq.mogenius.dev/websocket/exec-sh?namespace=${namespace}&podname=${pod}&container=${container}&token=${this._authService.tokenValue}`;
    this._socket = new WebSocket(url);

    return new Promise<Subject<Event>>((resolve, reject) => {
      const sub: Subject<Event> = new Subject<Event>();

      this._socket.onerror = (err) => {
        resolve(sub);
        sub.next(err);
      };

      this._socket.onclose = (err) => {
        resolve(sub);
        sub.complete();
      };

      this._socket.onmessage = (msg) => {
        resolve(sub);
        sub.next(msg);
      };

      this._socket.onopen = () => {
        console.log('Successfully connected to:', url);
        resolve(sub);
      };
    });

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

  public sendMessage(message: string): void {
    if (this._socket.readyState === WebSocket.OPEN) {
      console.log('Sending message:', message);
      const msg = new MessageEvent('message', { data: message });
      this._socket.send(message);
    }
  }
}

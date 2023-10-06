import { Injectable } from '@angular/core';
import { environment } from '@pq/environments/environment';
import { AuthService } from '@pq/user/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private _socket: Socket;

  private _messagesSubject = new Subject<string>();

  constructor(private readonly _authService: AuthService) {}

  public connect(
    namespace: string,
    pod: string,
    container: string
  ): Promise<void> {
    console.log('connect');

    return new Promise((resolve, reject) => {
      try {
        this._socket = io('wss://punq.mogenius.dev/websocket/exec-sh', {
          extraHeaders: {
            'X-Namespace': namespace,
            'X-Podname': pod,
            'X-Container': container,
            Authorization: 'Bearer ' + this._authService.tokenValue,
          },
        });

        this._socket.on('connect', () => {
          console.log(this._socket); // x8WIv7-mJelg7on_ALbx
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

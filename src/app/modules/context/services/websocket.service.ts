import { Injectable } from '@angular/core';
import { environment } from '@pq/environments/environment';
import { AuthService } from '@pq/user/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  constructor(private readonly _authService: AuthService) {}

  public getWebSocket(
    namespace: string,
    pod: string,
    container: string): WebSocket{
    const url = `${environment.ws.url}/exec-sh?namespace=${namespace}&podname=${pod}&container=${container}&token=${this._authService.tokenValue}`;
    return new WebSocket(url);
  }
}

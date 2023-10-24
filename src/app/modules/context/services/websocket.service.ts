import { Injectable } from '@angular/core';
import { environment } from '@pq/environments/environment';
import { AuthService } from '@pq/user/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private readonly _authService: AuthService) {}

  public getWebSocket(namespace: string, pod: string, container: string, context: string): WebSocket {
    const url = `${environment.ws.url}/exec-sh?namespace=${namespace}&podname=${pod}&context=${context}&container=${container}&token=${this._authService.tokenValue}`;
    return new WebSocket(url);
  }
}

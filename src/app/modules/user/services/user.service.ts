import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PunqUtils } from '@pq/core/utils';
import { environment } from '@pq/environments/environment';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user$ = new BehaviorSubject<any>(null);
  private _allUsers$ = new BehaviorSubject<any>(null);
  constructor(private readonly _httpClient: HttpClient) {}

  public user(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.userService.url,
      environment.userService.user.endPoint
    );
    return this._httpClient
      .request(environment.userService.user.method, url, {
        headers: {
          'Content-Type': environment.userService.user.header.contentType,
        },
      })
      .pipe(
        tap((response) => {
          this._user$.next(response);
        })
      );
  }

  public allUsers(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.userService.url,
      environment.userService.allUsers.endPoint
    );
    return this._httpClient
      .request(environment.userService.allUsers.method, url, {
        headers: {
          'Content-Type': environment.userService.allUsers.header.contentType,
        },
      })
      .pipe(
        map((response: any) => response.result),
        tap((response) => {
          console.log(response);
          this._allUsers$.next(response);
        })
      );
  }

  public get user$(): BehaviorSubject<any> {
    return this._user$;
  }

  get allUsers$(): BehaviorSubject<any> {
    return this._allUsers$;
  }
}

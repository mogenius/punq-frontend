import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '@pq/environments/environment';
import { PunqUtils } from '@pq/core/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _token$ = new BehaviorSubject<string | null>(null);

  constructor(private readonly _httpClient: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.userService.url,
      environment.userService.login.endPoint
    );

    return this._httpClient
      .request<any>(environment.userService.login.method, url, {
        headers: {
          'Content-Type': environment.userService.login.header.contentType,
        },
        body: {
          email: email,
          password: password,
        },
      })
      .pipe(
        tap((response) => {
          this._token$.next(response.token);
          localStorage.setItem('PUNQ_USER_AUTH_TOKEN', response.token);
        })
      );
  }

  public initialize(): Observable<any> {
    let token: string | null = null;

    if (this._token$.value) {
      token = this._token$.value;
    } else if (!!localStorage.getItem('PUNQ_USER_AUTH_TOKEN')) {
      token = localStorage.getItem('PUNQ_USER_AUTH_TOKEN');
    } else {
      return of(false);
    }

    if (!token) return of(false);

    this._token$.next(token);

    const url = PunqUtils.cleanUrl(
      environment.userService.url,
      environment.userService.authenticate.endPoint
    );

    return this._httpClient
      .request<any>(environment.userService.authenticate.method, url, {
        headers: {
          'Content-Type':
            environment.userService.authenticate.header.contentType,
        },
      })
      .pipe(
        tap((response) => {
          this._token$.next(token);
          localStorage.setItem('PUNQ_USER_AUTH_TOKEN', token!);
        }),
        map((response) => true),
        catchError(() => {
          this._token$.next(null);
          localStorage.removeItem('PUNQ_USER_AUTH_TOKEN');
          return of(false);
        })
      );
  }

  public logout(): void {
    this._token$.next(null);
    localStorage.removeItem('PUNQ_USER_AUTH_TOKEN');
  }

  get token$(): BehaviorSubject<string | null> {
    return this._token$;
  }

  get tokenValue(): string | null {
    return this._token$.value;
  }
}

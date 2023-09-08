import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PunqUtils } from '@pq/core/utils';
import { environment } from '@pq/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  private readonly _version = new BehaviorSubject<any>(null);
  constructor(private readonly _http: HttpClient) {}

  public version(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.misc.url,
      environment.misc.version.endPoint
    );

    return this._http
      .request<any>(environment.misc.version.method, url, {
        headers: {
          'Content-Type': environment.misc.version.header.contentType,
        },
      })
      .pipe(tap((response) => this._version.next(response)));
  }

  public get version$(): BehaviorSubject<any> {
    return this._version;
  }
}

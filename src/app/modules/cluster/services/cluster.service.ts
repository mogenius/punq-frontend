import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PunqUtils } from '@pq/core/utils';
import { environment } from '@pq/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClusterService {
  private readonly _contextList$ = new BehaviorSubject<any>(null);
  private readonly _currentContext$ = new BehaviorSubject<any>(null);

  constructor(private readonly _http: HttpClient) {}

  private selectContext(context: any): void {
    localStorage.setItem('context', JSON.stringify(context));
    this._currentContext$.next(context);
  }

  public initContext(): void {
    const context = localStorage.getItem('context');

    if (context) {
      this.selectContext(JSON.parse(context));
    }
  }

  public contextList(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.clusterService.url,
      environment.clusterService.context.list.endPoint
    );

    return this._http
      .request<any>(environment.clusterService.context.list.method, url, {
        headers: {
          'Content-Type':
            environment.clusterService.context.list.header.contentType,
        },
      })
      .pipe(
        tap((response) => this._contextList$.next(response)),
        tap((response) => {
          if (
            !this.currentContext$.value ||
            !response.find(
              (context: any) => context.id === this.currentContext$.value.id
            )
          ) {
            this._currentContext$.next(response[0] ?? null);
          }
        })
      );
  }

  public cleanUp() {
    localStorage.removeItem('context');
    this._currentContext$.next(null);
  }

  get contextList$(): BehaviorSubject<any> {
    return this._contextList$;
  }

  get currentContext$(): BehaviorSubject<any> {
    return this._currentContext$;
  }
}

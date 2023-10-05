import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PunqUtils } from '@pq/core/utils';
import { environment } from '@pq/environments/environment';
import { AuthService } from '@pq/user/services/auth.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  private readonly _contextList$ = new BehaviorSubject<any>(null);
  private readonly _currentContext$ = new BehaviorSubject<any>(null);
  private readonly _contextInfo$ = new BehaviorSubject<any>(null);
  private readonly _providers$ = new BehaviorSubject<any>(null);

  constructor(
    private readonly _http: HttpClient, //private readonly _workloadService: WorkloadService
    private readonly _authService: AuthService
  ) {}

  public selectContext(context: any | null): void {
    if (context === null) {
      this._currentContext$.next(null);
      localStorage.removeItem('context');
    } else {
      localStorage.setItem('context', context?.id);
      this._currentContext$.next(context);
    }
  }

  public contextList(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.contextService.url,
      environment.contextService.context.list.endPoint
    );

    return this._http
      .request<any>(environment.contextService.context.list.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.context.list.header.contentType,
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
            const locContext = localStorage
              .getItem('context')
              ?.replaceAll('"', '');

            if (!!locContext) {
              const context = response.find(
                (context: any) => context.id === locContext
              );
              this.selectContext(context ?? response[0]);
            } else {
              this.selectContext(response[0] ?? null);
            }
          }
        })
      );
  }

  public details(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.contextService.url,
      environment.contextService.context.details.endPoint
    );

    return this._http
      .request<any>(environment.contextService.context.info.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.context.info.header.contentType,
        },
      })

      .pipe(tap((response) => this._currentContext$.next(response)));
  }

  public providers(): Observable<any> {
    if (this._providers$.value !== null) {
      return this._providers$;
    }

    const url = PunqUtils.cleanUrl(
      environment.contextService.url,
      environment.contextService.context.providers.endPoint
    );

    return this._http
      .request<any>(environment.contextService.context.providers.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.context.providers.header.contentType,
        },
      })
      .pipe(
        tap((res) => {
          this._providers$.next(res);
        })
      );
  }

  public delete(contextId: string): Observable<any> {
    if (this._currentContext$.value.id !== contextId) {
      this._currentContext$.next({
        contextId: contextId,
      });
    }

    const url = PunqUtils.cleanUrl(
      environment.contextService.url,
      environment.contextService.context.delete.endPoint
    );

    return this._http
      .request<any>(environment.contextService.context.delete.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.context.delete.header.contentType,
        },
      })
      .pipe(
        switchMap(() => {
          return this.contextList();
        })
      );
  }

  public info(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.contextService.url,
      environment.contextService.context.info.endPoint
    );

    return this._http
      .request<any>(environment.contextService.context.info.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.context.info.header.contentType,
        },
      })

      .pipe(tap((response) => this._contextInfo$.next(response)));
  }

  public uploadConfig(file: File): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.contextService.url,
      environment.contextService.context.validateConfig.endPoint
    );

    const formData = new FormData();
    formData.append('file', file, file.name);

    return this._http.request(
      environment.contextService.context.validateConfig.method,
      url,
      {
        body: formData,
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  public addContexts(contexts: any[]): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.contextService.url,
      environment.contextService.context.create.endPoint
    );

    return this._http.request(
      environment.contextService.context.create.method,
      url,
      {
        body: contexts,
        headers: {
          'Content-Type':
            environment.contextService.context.create.header.contentType,
        },
      }
    );
  }

  public patchContext(context: any): Observable<any> {
    const url = PunqUtils.cleanUrl(
      environment.contextService.url,
      environment.contextService.context.patch.endPoint
    );

    return this._http.request(
      environment.contextService.context.patch.method,
      url,
      {
        body: context,
        headers: {
          'Content-Type':
            environment.contextService.context.patch.header.contentType,
        },
      }
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

  get contextInfo$(): BehaviorSubject<any> {
    return this._contextInfo$;
  }

  get providers$(): BehaviorSubject<any> {
    return this._providers$;
  }
}

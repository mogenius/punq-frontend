import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BannerStateEnum } from '@pq/core/banner-state.enum';
import { PunqUtils } from '@pq/core/utils';
import { environment } from '@pq/environments/environment';
import { BannerService } from '@pq/shared/services/banner.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscriber,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import YAML from 'yaml';
import {
  EventSourcePolyfill,
  EventSourcePolyfillInit,
} from 'event-source-polyfill';
import { AuthService } from '@pq/user/services/auth.service';
import { ContextService } from './context.service';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class WorkloadService {
  private baseUrl = environment.contextService.url;
  private readonly _availableResources$ = new BehaviorSubject<any>(null);
  private readonly _templates$ = new BehaviorSubject<any>(null);
  private readonly _selectedResource$ = new BehaviorSubject<any>(null);
  private readonly _currentWorkloads$ = new BehaviorSubject<any>(null);
  private readonly _selectedWorkload$ = new BehaviorSubject<any>(null);
  private readonly _namespaces$ = new BehaviorSubject<any>(null);
  private readonly _unsafedModification$ = new BehaviorSubject<string | null>(
    null
  );
  private readonly _isEditorFocus$ = new BehaviorSubject<boolean>(false);
  private _changeWorkloadSubject = new Subject<any>();
  private readonly _filter$ = new BehaviorSubject<{
    namespace: string | null;
    string: string | null;
  }>({
    namespace: null,
    string: null,
  });

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _bannerService: BannerService,
    private readonly _authService: AuthService,
    private readonly _contextService: ContextService,
    private readonly _ngZone: NgZone
  ) {}

  public saveModifications(): Observable<any> {
    if (this._unsafedModification$.value === null) return of(null);

    let workload: any;

    try {
      workload = YAML.parse(this._unsafedModification$.value);
    } catch (error: any) {
      this._bannerService.addBanner(
        BannerStateEnum.error,
        `
            <b>Failed to update ${this._selectedResource$.value}</b>
            <br>
            <span>${error}</span>
          `,
        6000
      );
      return throwError(() => error);
    }

    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.contextService.workload.updateWorkload.endPoint(
        this._selectedResource$.value.toLowerCase()
      )
    );

    return this._httpClient
      .request(environment.contextService.workload.updateWorkload.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.workload.updateWorkload.header
              .contentType,
        },
        body: workload,
      })
      .pipe(
        catchError((error) => {
          console.log(error);

          this._bannerService.addBanner(
            BannerStateEnum.error,
            `
            <b>Failed to update ${this._selectedResource$.value}</b>
            <br>
            <span>${error.error?.ErrStatus?.message ?? error.error}</span>
          `,
            6000
          );
          return throwError(() => error);
        }),
        map((response: any) => {
          delete response?.result?.metadata?.managedFields;
          return response;
        }),
        tap((response: any) => {
          this._bannerService.addBanner(
            BannerStateEnum.success,
            `${this._selectedResource$.value} updated`,
            3000
          );
          this._unsafedModification$.next(null);
          this._changeWorkloadSubject.next({
            prev: this._selectedWorkload$.value,
            next: response.result,
          });
          this._selectedWorkload$.next(response.result);
          this._currentWorkloads$.next(
            this._currentWorkloads$.value.map((item: any) => {
              if (item.metadata.name === response.result.metadata.name) {
                return response.result;
              }
              return item;
            })
          );
        })
      );
  }

  public availableResources(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.contextService.workload.availableResources.endPoint
    );
    return this._httpClient
      .request(
        environment.contextService.workload.availableResources.method,
        url,
        {
          headers: {
            'Content-Type':
              environment.contextService.workload.availableResources.header
                .contentType,
          },
        }
      )
      .pipe(
        tap((response) => this._availableResources$.next(response)),
        tap((response: any) => {
          if (this._selectedResource$.value === null) {
            this._selectedResource$.next(response[0] ?? null);
          }
        })
      );
  }

  public deleteWorkload(workload: any): Observable<any> {
    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.contextService.workload.deleteWorkload.endPoint(
        this.selectedResource$.value,
        workload.metadata.name,
        workload.metadata.namespace ?? undefined
      )
    );

    return this._httpClient
      .request(environment.contextService.workload.deleteWorkload.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.workload.deleteWorkload.header
              .contentType,
        },
      })
      .pipe(
        tap(() => {
          if (this._currentWorkloads$.value.includes(workload)) {
            this._currentWorkloads$.next(
              this._currentWorkloads$.value.filter(
                (item: any) => item !== workload
              )
            );
          }
        }),
        tap((response: any) => {
          this._changeWorkloadSubject.next({
            prev: workload,
            next: null,
          });
        })
      );
  }

  public templates(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.contextService.workload.templates.endPoint
    );
    return this._httpClient
      .request(environment.contextService.workload.templates.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.workload.templates.header.contentType,
        },
      })
      .pipe(tap((response) => this._templates$.next(response)));
  }

  public workloads(resource: string): Observable<any> {
    if (
      resource === 'Namespace' &&
      !!this._namespaces$.value &&
      !this._filter$.value.namespace
    ) {
      return this._namespaces$;
    }

    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.contextService.workload.workloads.endPoint(
        resource.toLowerCase()
      )
    );
    return this._httpClient
      .request(environment.contextService.workload.workloads.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.workload.workloads.header.contentType,
        },
        params: {
          namespace: this._filter$.value.namespace ?? '',
        },
      })
      .pipe(
        map((response: any) => response.error ?? response.result),
        map((response: any) => {
          response?.map((item: any) => {
            delete item.metadata.managedFields;
          });

          return response;
        }),
        map((response: any) => {
          return _.sortBy(response, 'metadata.name', 'asc');
        }),
        tap((response) => {
          if (resource === 'namespace') {
            this._namespaces$.next(response);
          }
        })
      );
  }

  public describe(
    resource: string,
    name: string,
    namespace?: string
  ): Observable<any> {
    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.contextService.workload.describe.endPoint(
        resource.toLowerCase(),
        name,
        namespace
      )
    );
    return this._httpClient.request(
      environment.contextService.workload.describe.method,
      url,
      {
        headers: {
          'Content-Type':
            environment.contextService.workload.describe.header.contentType,
        },
      }
    );
  }

  // ----------------- POD LOGS ------------------
  // ----------------- POD LOGS ------------------
  // ----------------- POD LOGS ------------------
  public podLogs(namespace: string, name: string): Observable<any> {
    return new Observable((observer: Subscriber<string>) => {
      let eventSource: EventSourcePolyfill;

      const close = (): void => {
        eventSource.close();
        // namespaceServiceSubscribe$.unsubscribe();
      };

      const initEventSource = (): void => {
        let url = PunqUtils.cleanUrl(
          this.baseUrl,
          environment.contextService.workload.podLogs.endPoint(namespace, name)
        );

        if (eventSource) {
          eventSource.close();
        }

        const options: EventSourcePolyfillInit = {
          headers: {
            Authorization: `Bearer ${this._authService.tokenValue}`,
            'X-Context-Id': this._contextService.currentContext$.value?.id,
            'content-type': 'text/event-stream',
          },
        };

        eventSource = new EventSourcePolyfill(url, options);

        // on open
        eventSource.onopen = (event: any) => {
          this._ngZone.run(() => {
            observer.next(event);
          });
        };

        // on message
        eventSource.onmessage = (event: any) => {
          this._ngZone.run(() => {
            try {
              observer.next(event.data);
            } catch (error) {
              console.log(error);
            }
          });
        };

        // On error
        eventSource.onerror = (event: any) => {
          this._ngZone.run(() => {
            console.log(event.error);

            observer.error(event);
          });
        };
      };

      initEventSource();

      return () => {
        close();
      };
    });
  }

  public cleanAll(): void {
    // this._availableResources$.next(null);
    // this._templates$.next(null);
    // this._selectedResource$.next(null);
    // this._currentWorkloads$.next(null);
    // this._selectedWorkload$.next(null);
    // this._namespaces$.next(null);
    // this._unsafedModification$.next(null);
    // this._changeWorkloadSubject = new Subject<any>();
    // this._filter$.next({
    //   namespace: null,
    //   string: null,
    // });
  }

  get availableResources$(): BehaviorSubject<any> {
    return this._availableResources$;
  }

  get templates$(): BehaviorSubject<any> {
    return this._templates$;
  }

  get selectedResource$(): BehaviorSubject<any> {
    return this._selectedResource$;
  }

  get currentWorkloads$(): BehaviorSubject<any> {
    return this._currentWorkloads$;
  }

  get selectedWorkload$(): BehaviorSubject<any> {
    return this._selectedWorkload$;
  }

  get namespaces$(): BehaviorSubject<any> {
    return this._namespaces$;
  }

  get isEditorFocus$(): BehaviorSubject<boolean> {
    return this._isEditorFocus$;
  }

  get filter$(): BehaviorSubject<{
    namespace: string | null;
    string: string | null;
  }> {
    return this._filter$;
  }

  get unsafedModification$(): BehaviorSubject<string | null> {
    return this._unsafedModification$;
  }
  get changeWorkloadSubject$(): Subject<any> {
    return this._changeWorkloadSubject;
  }
}

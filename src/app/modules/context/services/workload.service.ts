import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PunqUtils } from '@pq/core/utils';
import { environment } from '@pq/environments/environment';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

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
  private readonly _filter$ = new BehaviorSubject<{
    namespace: string | null;
    string: string | null;
  }>({
    namespace: null,
    string: null,
  });

  constructor(private readonly _httpClient: HttpClient) {
    this.currentWorkloads$.subscribe((workloads) => {});
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
      resource === 'namespace' &&
      !!this._namespaces$.value &&
      !this._filter$.value.namespace
    ) {
      return this._namespaces$;
    }

    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.contextService.workload.workloads.endPoint(resource)
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
        map((response: any) => response.result),
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
        resource,
        name,
        namespace
      )
    );
    return this._httpClient
      .request(environment.contextService.workload.describe.method, url, {
        headers: {
          'Content-Type':
            environment.contextService.workload.describe.header.contentType,
        },
      })
      .pipe(tap((response: any) => console.log(response)));
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

  get filter$(): BehaviorSubject<{
    namespace: string | null;
    string: string | null;
  }> {
    return this._filter$;
  }
}

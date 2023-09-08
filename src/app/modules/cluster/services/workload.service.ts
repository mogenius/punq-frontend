import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PunqUtils } from '@pq/core/utils';
import { environment } from '@pq/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkloadService {
  private baseUrl = environment.clusterService.url;
  private readonly _availableResources$ = new BehaviorSubject<any>(null);
  private readonly _templates$ = new BehaviorSubject<any>(null);

  constructor(private readonly _httpClient: HttpClient) {}

  public availableResources(): Observable<any> {
    console.log('availableResources');

    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.clusterService.workload.availableResources.endPoint
    );
    return this._httpClient
      .request(
        environment.clusterService.workload.availableResources.method,
        url,
        {
          headers: {
            'Content-Type':
              environment.clusterService.workload.availableResources.header
                .contentType,
          },
        }
      )
      .pipe(tap((response) => this._availableResources$.next(response)));
  }

  public templates(): Observable<any> {
    const url = PunqUtils.cleanUrl(
      this.baseUrl,
      environment.clusterService.workload.templates.endPoint
    );
    return this._httpClient
      .request(environment.clusterService.workload.templates.method, url, {
        headers: {
          'Content-Type':
            environment.clusterService.workload.templates.header.contentType,
        },
      })
      .pipe(tap((response) => this._templates$.next(response)));
  }

  get availableResources$(): BehaviorSubject<any> {
    return this._availableResources$;
  }

  get templates$(): BehaviorSubject<any> {
    return this._templates$;
  }
}

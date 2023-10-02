import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoadingService } from '@pq/shared/services/loading.service';
import { Observable, catchError, forkJoin, of, tap, throwError } from 'rxjs';
import { ContextService } from '../services/context.service';
import { WorkloadService } from '../services/workload.service';

@Injectable({
  providedIn: 'root',
})
export class ContextDetailsResolver {
  constructor(
    private readonly _contextService: ContextService,
    private readonly _workloadService: WorkloadService,
    private readonly _loadingService: LoadingService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const contextId = route.params.contextId;

    const context = this._contextService.contextList$.value.find(
      (context: any) => context.id === contextId
    );

    if (!!context) {
      this._contextService.selectContext(context);
    } else {
      this._contextService.selectContext(
        this._contextService.contextList$.value[0]
      );
    }

    this._loadingService.isLoading$.next(true);

    return forkJoin([
      this._workloadService
        .availableResources()
        .pipe(catchError((err) => throwError(() => err))),
      this._workloadService.workloads('namespace').pipe(
        catchError((err) => throwError(() => err)),
        tap((res) => {
          console.log('RES: ', res);

          if (!!res.error) {
            console.error('ERROR: ', res.error);
          }
        })
      ),
      this._contextService
        .info()
        .pipe(catchError((err) => throwError(() => err))),
    ]).pipe(
      catchError((err) => {
        console.log('ERROR: ', err);

        this._loadingService.isLoading$.next(false);
        this._loadingService.errorState$.next(
          'Error while loading context. Please check your kubernetes integration.'
        );
        return of(false);
      }),
      tap(() => this._loadingService.isLoading$.next(false))
    );
  }
}

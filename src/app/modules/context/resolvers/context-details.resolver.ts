import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, map, of, switchMap, take, tap } from 'rxjs';
import { ContextService } from '../services/context.service';
import { WorkloadService } from '../services/workload.service';

@Injectable({
  providedIn: 'root',
})
export class ContextDetailsResolver {
  constructor(
    private readonly _contextService: ContextService,
    private readonly _workloadService: WorkloadService
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

    return forkJoin([
      this._workloadService.availableResources(),
      this._workloadService.workloads('namespace'),
      this._contextService.info(),
    ]);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { WorkloadService } from '../services/workload.service';
import { Observable, firstValueFrom, from, map, of, tap } from 'rxjs';
import { ContextService } from '../services/context.service';

@Injectable({
  providedIn: 'root',
})
export class WorkloadDetailsResolver {
  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _contextService: ContextService,
    private readonly _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const namespace: string =
      route.params.namespace === '-' ? null : route.params.namespace;
    const workload: string = route.params.workload;

    const workloadItem = this._workloadService.currentWorkloads$.value.find(
      (w: any) => {
        if (!namespace) return w.metadata.name === workload;
        return (
          w.metadata.namespace === namespace && w.metadata.name === workload
        );
      }
    );

    if (!workloadItem) {
      return from(
        this._router.navigate([
          '/',
          'context',
          this._contextService.currentContext$.value.id,
          'workloads',
          route.params.resource,
        ])
      ).pipe(map(() => false));
    }

    this._workloadService.selectedWorkload$.next(workloadItem);

    return of(true);
  }
}

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
    const workload: string = route.params.workload;

    const workloadItem = this._workloadService.currentWorkloads$.value.find(
      (w: any) => {
        return w.metadata.name === workload;
      }
    );

    if (!workloadItem) {
      return from(
        this._router.navigate([
          '/',
          'context',
          this._contextService.currentContext$.value.id,
          route.params.resource,
        ])
      ).pipe(map(() => false));
    }

    this._workloadService.selectedWorkload$.next(workloadItem);

    return of(true);
  }
}

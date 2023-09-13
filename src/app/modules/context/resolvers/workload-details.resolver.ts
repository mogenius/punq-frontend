import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { WorkloadService } from '../services/workload.service';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkloadDetailsResolver {
  constructor(
    private readonly _workloadService: WorkloadService,
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
      this._router.navigate(['/', 'context', route.params.resource]);
      return of(false);
    }

    this._workloadService.selectedWorkload$.next(workloadItem);

    return of(true);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { WorkloadService } from '../services/workload.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkloadListResolver {
  constructor(private readonly _workloadService: WorkloadService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const resource: string = route.params.resource;

    this._workloadService.selectedResource$.next(resource);
    this._workloadService.currentWorkloads$.next(null);

    return this._workloadService.workloads(resource).pipe(
      tap((response: any) => {
        this._workloadService.currentWorkloads$.next(response);
      })
    );
  }
}

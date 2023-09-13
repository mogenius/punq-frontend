import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { WorkloadService } from '../services/workload.service';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NamespaceListResolver {
  constructor(private readonly _workloadService: WorkloadService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._workloadService.workloads('namespace').pipe(map(() => true));
  }
}

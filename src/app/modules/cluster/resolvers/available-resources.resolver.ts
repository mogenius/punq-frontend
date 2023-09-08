import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WorkloadService } from '../services/workload.service';

@Injectable({
  providedIn: 'root',
})
export class AvailableResourcesResolver {
  constructor(private readonly _workloadService: WorkloadService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._workloadService.availableResources();
  }
}

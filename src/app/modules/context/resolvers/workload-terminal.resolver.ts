import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable, from, map, of } from 'rxjs';
import { WorkloadService } from '../services/workload.service';

@Injectable({
  providedIn: 'root',
})
export class WorkloadLogsResolver {
  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (this._workloadService.selectedResource$.value === 'Pod') {
      return of(true);
    } else {
      let url = state.url.split('/');
      url.pop();
      url.push('describe');

      return from(this._router.navigate(url)).pipe(map(() => false));
    }
  }
}

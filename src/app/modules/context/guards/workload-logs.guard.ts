import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, from, map, of } from 'rxjs';
import { WorkloadService } from '../services/workload.service';
import { ContextService } from '../services/context.service';

@Injectable({
  providedIn: 'root',
})
export class WorkloadLogsGuard {
  constructor(
    private readonly _router: Router,
    private readonly _workloadService: WorkloadService,
    private readonly _contextService: ContextService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route, state);
    console.log('GUARD', this._workloadService.selectedResource$.value);
  }
}

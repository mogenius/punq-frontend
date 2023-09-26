import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkloadLogsGuard {
  constructor(private readonly _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const resource = route.parent?.params['resource'];
    const url = state.url.split('/');
    url.pop();

    if (resource !== 'Pod') {
      this._router.navigate([...url, 'describe']);
      return of(false);
    } else {
      return of(true);
    }
  }
}

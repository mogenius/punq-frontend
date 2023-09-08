import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ClusterService } from '@pq/cluster/services/cluster.service';
import { Observable, of } from 'rxjs';
import { MiscService } from './services/misc.service';

@Injectable({
  providedIn: 'root',
})
export class VersionResolver {
  constructor(private readonly _miscService: MiscService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._miscService.version();
  }
}

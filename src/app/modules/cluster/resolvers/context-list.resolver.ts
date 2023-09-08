import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClusterService } from '../services/cluster.service';

@Injectable({
  providedIn: 'root',
})
export class ContextListResolver {
  constructor(private readonly _clusterService: ClusterService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._clusterService.contextList();
  }
}

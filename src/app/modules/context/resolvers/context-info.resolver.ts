import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContextService } from '../services/context.service';

@Injectable({
  providedIn: 'root',
})
export class ContextInfoResolver {
  constructor(private readonly _contextService: ContextService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._contextService.info();
  }
}

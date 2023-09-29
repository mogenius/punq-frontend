import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContextService } from '../services/context.service';

@Injectable({
  providedIn: 'root',
})
export class ContextDetailsGuard {
  constructor(private readonly _contextService:ContextService) {}

  canDeactivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const contextId = this._contextService.currentContext$.value?.id;

    this._contextService.details

    if(!!contextId){
      return of(true);
    }else{

  }
}

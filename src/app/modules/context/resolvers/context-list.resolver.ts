import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { ContextService } from '../services/context.service';

@Injectable({
  providedIn: 'root',
})
export class ContextListResolver {
  constructor(
    private readonly _contextService: ContextService,
    private readonly _router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._contextService.contextList().pipe(
      switchMap(() => {
        // Connect Page : Do nothing
        if ((state.url as string).includes('context/connect')) return of(true);

        // context but no contextId : find contextId and redirect
        if (
          (state.url as string) === '/context' &&
          !!this._contextService.currentContext$.value.id
        ) {
          return of(true).pipe(
            tap(() =>
              this._router.navigate([
                '/',
                'context',
                this._contextService.currentContext$.value.id,
              ])
            )
          );
        }

        // context but no contextId : redirect to connect page
        if (
          (state.url as string) === '/context' &&
          !this._contextService.currentContext$.value.id
        ) {
          return of(true).pipe(
            tap(() => this._router.navigate(['/context/connect']))
          );
        }

        return of(true); // Fallback for compiler
      }),
      map(() => true)
    );
  }
}

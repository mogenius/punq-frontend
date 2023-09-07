import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!!this._authService.tokenValue) {
      return of(true);
    } else {
      return of(false).pipe(
        tap(() => {
          this.redirect();
        })
      );
    }
  }

  canActivateChild(): Observable<boolean> {
    if (!!this._authService.tokenValue) {
      return of(true);
    } else {
      return of(false).pipe(
        tap(() => {
          this.redirect();
        })
      );
    }
  }

  private redirect(): void {
    this._router.navigate(['/', 'user', 'login']);
  }
}

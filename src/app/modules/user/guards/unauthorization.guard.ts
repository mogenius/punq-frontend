import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizationGuard {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this._authService.tokenValue) {
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
    if (!this._authService.tokenValue) {
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
    this._router.navigate(['/', 'cluster']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MiscService } from '@pq/shared/services/misc.service';
import { AuthService } from '@pq/user/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-context-top-nav',
  templateUrl: './context-top-nav.component.html',
  styleUrls: ['./context-top-nav.component.scss'],
})
export class ContextTopNavComponent {
  constructor(
    private readonly _miscService: MiscService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  public logout(): void {
    this._authService.logout();
    this._router.navigate(['/', 'user', 'login']);
  }

  public toggleDesignMode(): void {}

  public openHelpModal(): void {}

  get version$(): BehaviorSubject<any> {
    return this._miscService.version$;
  }
}

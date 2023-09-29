import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { MiscService } from '@pq/shared/services/misc.service';
import { StorageService } from '@pq/shared/services/storage.service';
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
    private readonly _router: Router,
    private readonly _contextService: ContextService,
    private renderer: Renderer2,
    private readonly _storageService: StorageService
  ) {}

  public toggleDM(): void {
    document.querySelector('html')?.getAttribute('data-bs-theme') === 'dark'
      ? this.changeTheme('light')
      : this.changeTheme('dark');
  }

  private changeTheme(theme: string) {
    // Get the <html> element
    const htmlElement = document.querySelector('html');

    // Set the data-bs-theme attribute to the new theme value
    this.renderer.setAttribute(htmlElement, 'data-bs-theme', theme);

    this._storageService.setItem('theme', theme);
  }

  public logout(): void {
    this._authService.logout();
    this._router.navigate(['/', 'user', 'login']);
  }

  public openHelpModal(): void {}

  get version$(): BehaviorSubject<any> {
    return this._miscService.version$;
  }

  get currentContext$(): BehaviorSubject<any> {
    return this._contextService.currentContext$;
  }
}

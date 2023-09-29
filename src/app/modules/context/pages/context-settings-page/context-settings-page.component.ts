import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';

@Component({
  selector: 'pq-context-settings-page',
  templateUrl: './context-settings-page.component.html',
  styleUrls: ['./context-settings-page.component.scss'],
})
export class ContextSettingsPageComponent {
  constructor(
    private readonly _contextService: ContextService,
    private readonly _router: Router
  ) {}
  public deleteContext(): void {
    this._contextService
      .delete(this._contextService.currentContext$.value.id)
      .subscribe({
        next: () => {
          this._router.navigate(['/', 'context']);
        },
        error: (error) => {},
      });
  }
}

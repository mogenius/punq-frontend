import { Component } from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';

@Component({
  selector: 'pq-context-settings-page',
  templateUrl: './context-settings-page.component.html',
  styleUrls: ['./context-settings-page.component.scss'],
})
export class ContextSettingsPageComponent {
  constructor(private readonly _contextService: ContextService) {}
  public deleteContext(): void {
    this._contextService
      .delete(this._contextService.currentContext$.value.id)
      .subscribe({
        next: () => {},
        error: (error) => {},
      });
  }
}

import { Component, HostListener } from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';
import { BannerStateEnum } from '@pq/core/banner-state.enum';
import { BannerService } from '@pq/shared/services/banner.service';
import deepmerge from 'deepmerge';
import { isEqual } from 'lodash';
import { Subject } from 'rxjs';

@Component({
  selector: 'pq-context-settings-page',
  templateUrl: './context-settings-page.component.html',
  styleUrls: ['./context-settings-page.component.scss'],
})
export class ContextSettingsPageComponent {
  @HostListener('window:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.patchContext();
    }
  }

  private _resetEmitter: Subject<void> = new Subject<void>();
  private _changes: any;
  constructor(
    private readonly _contextService: ContextService,
    private readonly _bannerService: BannerService
  ) {}
  public changedContext(context: any): void {
    const newContext = deepmerge(
      this._contextService.currentContext$.value,
      context
    );

    if (isEqual(this._contextService.currentContext$.value, newContext)) {
      this._changes = null;
    } else {
      this._changes = newContext;
    }
  }

  public patchContext(): void {
    if (!this._changes) {
      return;
    }

    this._contextService.patchContext(this._changes).subscribe({
      next: () => {
        this._contextService.selectContext(this._changes);
        this._bannerService.addBanner(
          BannerStateEnum.success,
          'Context updated',
          3000
        );
        this._changes = null;
      },
      error: (error) => {
        console.log(error);
        this._bannerService.addBanner(
          BannerStateEnum.error,
          'Context update failed',
          5000
        );
      },
    });
  }

  public discardChanges(): void {
    this._resetEmitter.next();
  }

  get changes(): any {
    return this._changes;
  }

  get resetEmitter(): Subject<void> {
    return this._resetEmitter;
  }
}

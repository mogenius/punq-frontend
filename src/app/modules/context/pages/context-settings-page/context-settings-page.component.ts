import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { BannerStateEnum } from '@pq/core/banner-state.enum';
import { BannerService } from '@pq/shared/services/banner.service';

@Component({
  selector: 'pq-context-settings-page',
  templateUrl: './context-settings-page.component.html',
  styleUrls: ['./context-settings-page.component.scss'],
})
export class ContextSettingsPageComponent implements OnInit {
  public _contextNameControl: FormControl;

  constructor(
    private readonly _contextService: ContextService,
    private readonly _router: Router,
    private readonly _bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this._contextNameControl = new FormControl({
      value: this._contextService.currentContext$.value?.name ?? '',
      disabled: true,
    });
  }

  public deleteContext(): void {
    this._contextService
      .delete(this._contextService.currentContext$.value.id)
      .subscribe({
        next: () => {
          console.log(this._contextService.contextList$.value);
          this._contextService.selectContext(null);
          this._router.navigate([
            '/',
            'context',
            this._contextService.contextList$.value[0].id,
          ]);
        },
        error: (error) => {
          this._bannerService.addBanner(
            BannerStateEnum.error,
            `
            <b>Failed to delete ${this._contextService.currentContext$.value.name}</b>
            <br>
            <span>${error.err}</span>
          `,
            6000
          );
        },
      });
  }

  get contextNameControl(): FormControl {
    return this._contextNameControl;
  }
}

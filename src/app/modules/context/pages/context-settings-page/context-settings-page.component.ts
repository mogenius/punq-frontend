import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';

@Component({
  selector: 'pq-context-settings-page',
  templateUrl: './context-settings-page.component.html',
  styleUrls: ['./context-settings-page.component.scss'],
})
export class ContextSettingsPageComponent implements OnInit {
  public _contextNameControl: FormControl;

  constructor(
    private readonly _contextService: ContextService,
    private readonly _router: Router
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
          this._router.navigate(['/', 'context']);
        },
        error: (error) => {},
      });
  }

  get contextNameControl(): FormControl {
    return this._contextNameControl;
  }
}

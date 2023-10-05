import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { start } from '@popperjs/core';
import { ContextService } from '@pq/context/services/context.service';
import { BaseSubscription } from '@pq/core/base-subscription';
import { BehaviorSubject, filter, map, pairwise, startWith, tap } from 'rxjs';

@Component({
  selector: 'pq-context-details-outlet',
  templateUrl: './context-details-outlet.component.html',
  styleUrls: ['./context-details-outlet.component.scss'],
})
export class ContextDetailsOutletComponent
  extends BaseSubscription
  implements OnInit
{
  private _contextControl: FormControl;

  constructor(
    private readonly _contextService: ContextService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this._contextControl = new FormControl({
      value: this._contextService.currentContext$.value?.id ?? '',
      disabled: false,
    });

    this._subscriptions.add(
      this._contextControl.valueChanges.subscribe((value) => {
        this._router.navigate(['/', 'context', value]);
      })
    );

    this._contextService.currentContext$.subscribe({
      next: (context) => {
        this._contextControl.setValue(context?.id ?? undefined, {
          emitEvent: false,
        });
      },
    });
  }

  get contextList$(): BehaviorSubject<any> {
    return this._contextService.contextList$;
  }

  get contextControl(): FormControl {
    return this._contextControl;
  }
}

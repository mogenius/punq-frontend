import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { BaseSubscription } from '@pq/core/base-subscription';
import { BehaviorSubject } from 'rxjs';

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
  }

  get contextList$(): BehaviorSubject<any> {
    return this._contextService.contextList$;
  }

  get contextControl(): FormControl {
    return this._contextControl;
  }
}

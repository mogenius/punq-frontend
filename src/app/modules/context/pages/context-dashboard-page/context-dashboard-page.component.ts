import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BaseSubscription } from '@pq/core/base-subscription';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-context-dashboard-page',
  templateUrl: './context-dashboard-page.component.html',
  styleUrls: ['./context-dashboard-page.component.scss'],
})
export class ContextDashboardPageComponent
  extends BaseSubscription
  implements OnInit, OnDestroy
{
  private _contextControl: FormControl;

  constructor(
    private readonly _contextService: ContextService,
    private readonly _router: Router,
    private readonly _workloadService: WorkloadService
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

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  get contextList$(): BehaviorSubject<any> {
    return this._contextService.contextList$;
  }

  get contextControl(): FormControl {
    return this._contextControl;
  }
}

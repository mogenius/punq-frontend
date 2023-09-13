import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContextService } from '@pq/context/services/context.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-context-dashboard-page',
  templateUrl: './context-dashboard-page.component.html',
  styleUrls: ['./context-dashboard-page.component.scss'],
})
export class ContextDashboardPageComponent implements OnInit {
  private _contextControl: FormControl;

  constructor(private readonly _contextService: ContextService) {}

  ngOnInit(): void {
    this._contextControl = new FormControl({
      value: this._contextService.currentContext$.value?.id ?? '',
      disabled: false,
    });
  }

  get contextList$(): BehaviorSubject<any> {
    return this._contextService.contextList$;
  }

  get contextControl(): FormControl {
    return this._contextControl;
  }
}

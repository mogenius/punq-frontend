import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BaseSubscription } from '@pq/core/base-subscription';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  pairwise,
  startWith,
} from 'rxjs';

@Component({
  selector: 'pq-context-details-sidebar-item',
  templateUrl: './context-details-sidebar-item.component.html',
  styleUrls: ['./context-details-sidebar-item.component.scss'],
})
export class ContextDetailsSidebarItemComponent
  extends BaseSubscription
  implements OnInit
{
  @Input() resource: string;

  private _workloads: any[] = [];

  constructor(
    private readonly _workloadService: WorkloadService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    // OPEN IF ROUTE INIT WITH THIS RESOURCE
    if (this.resource === this._workloadService.selectedResource$.value) {
      this._subscriptions.add(
        this._workloadService
          .workloads(this.resource)
          .subscribe((response: any) => {
            this._workloads = response;
            this._childrenOpen = true;
          })
      );
    }

    // CHECK FOR NAMESPACE FILTER CHANGES IF OPEN
    this._workloadService.filter$
      .pipe(
        filter(() => this._childrenOpen),
        map((filter) => filter.namespace),
        startWith(null),
        pairwise(),
        filter(([a, b]) => a !== b),
        map(([a, b]) => b)
      )
      .subscribe((namespace) => {
        this._workloadService
          .workloads(this.resource)
          .subscribe((response: any) => {
            this._workloads = response;
          });
      });
  }

  private _childrenOpen: boolean = false;

  toggleOpen(state?: boolean) {
    this._childrenOpen = state !== undefined ? state : !this._childrenOpen;
    if (this._childrenOpen) {
      this._workloadService
        .workloads(this.resource)
        .subscribe((response: any) => {
          this._workloads = response;
        });
    }

    this._router.navigate(['/', 'context', this.resource]).catch((err) => {
      console.log(err);
    });
  }

  get childrenOpen(): boolean {
    return this._childrenOpen;
  }

  get selectedResource$(): BehaviorSubject<any> {
    return this._workloadService.selectedResource$;
  }

  get workloads(): any[] {
    return this._workloads;
  }

  get searchString$(): Observable<string | null> {
    return this._workloadService.filter$.pipe(map((filter) => filter.string));
  }
}

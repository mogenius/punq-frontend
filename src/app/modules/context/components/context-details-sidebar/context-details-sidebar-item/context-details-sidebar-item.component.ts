import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '@pq/context/services/context.service';
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
    private readonly _contextService: ContextService,
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

    // Check for updates on children
    this._subscriptions.add(
      this._workloadService.changeWorkloadSubject$.subscribe({
        next: (change) => {
          const index = this._workloads.indexOf(change.prev);

          if (!!index) {
            if (change.next === null) {
              this._workloads.splice(index, 1);
            } else {
              this._workloads[index] = change.next;
            }
          }
        },
      })
    );

    // Check for contextSwitch
    this._contextService.currentContext$
      .pipe(
        pairwise(),
        filter(([a, b]) => a !== b)
      )
      .subscribe(([a, b]) => {
        this._childrenOpen = false;
      });
  }

  private _childrenOpen: boolean = false;

  public toggleOpen(state?: boolean) {
    this._childrenOpen = state !== undefined ? state : !this._childrenOpen;
    if (this._childrenOpen) {
      this._workloadService
        .workloads(this.resource)
        .subscribe((response: any) => {
          this._workloads = response;
        });
    }

    this._router
      .navigate([
        '/',
        'context',
        this._contextService.currentContext$.value.id,
        'workloads',
        this.resource,
      ])
      .catch((err) => {
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

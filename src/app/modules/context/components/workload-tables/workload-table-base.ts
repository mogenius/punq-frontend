import { Component, HostListener, Input, OnInit } from '@angular/core';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import _ from 'lodash';
import { BaseSubscription } from '@pq/core/base-subscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: '--- WORKLOAD TABLE BASE ---',
})
export class WorkloadTableBase extends BaseSubscription implements OnInit {
  @Input() public workloads: any[] = [];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousWorkload();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextWorkload();
        break;

      case 'Enter':
        if (!this._focusedWorkload?.metadata) return;
        event.preventDefault();
        this._router.navigateByUrl(
          this._router.url.split('?')[0] +
            `/namespace/${this._focusedWorkload.metadata.namespace ?? '-'}/${
              this._focusedWorkload.metadata.name
            }`
        );
        break;
      default:
        break;
    }
  }

  private _sortKey = 'metadata.name';
  private _sortDirection: 'asc' | 'desc' = 'asc';
  private _renderTryCount = 0;

  private _focusedWorkload: any = {};

  constructor(
    protected readonly _workloadService: WorkloadService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    const initialFocus = this._activatedRoute.snapshot.queryParams.focus;
    if (initialFocus) {
      this._focusedWorkload = this.workloads.find(
        (w) => w.metadata.name === initialFocus
      );

      this.ensureVisibilityOfFocusedElement();
    }
  }

  public sortBy(key: string): void {
    if (this._sortKey === key) {
      this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortDirection = 'asc';
    }
    this._sortKey = key;

    this._workloadService.currentWorkloads$.next(
      this.sortByKeyAndDirection(
        this._workloadService.currentWorkloads$.value,
        this._sortKey,
        this._sortDirection
      )
    );
  }

  private sortByKeyAndDirection(
    arr: Object[],
    key: string,
    direction: 'asc' | 'desc' = 'asc'
  ): Object[] {
    return _.orderBy(arr, [key], [direction]);
  }

  private focusNextWorkload(): void {
    if (this.workloads.length > 0) {
      if (this._focusedWorkload) {
        const index = this.workloads.findIndex((w) =>
          _.isEqual(w, this._focusedWorkload)
        );
        if (index < this.workloads.length - 1) {
          this._focusedWorkload = this.workloads[index + 1];
        } else {
          return;
        }
      } else {
        return;
      }
    }

    this.ensureVisibilityOfFocusedElement();
  }

  private focusPreviousWorkload(): void {
    if (this.workloads.length > 0) {
      if (this._focusedWorkload) {
        const index = this.workloads.findIndex((w) =>
          _.isEqual(w, this._focusedWorkload)
        );
        if (index > 0) {
          this._focusedWorkload = this.workloads[index - 1];
        } else {
          return;
        }
      } else {
        return;
      }
    }
    this.ensureVisibilityOfFocusedElement();
  }

  private ensureVisibilityOfFocusedElement(): void {
    // Get the responsive-table element
    const container = document.querySelector(
      '#workload-table-container'
    ) as HTMLDivElement;

    // Get the first element with the class "focused" inside the container
    const focusedElement = container?.querySelector('.focused') as HTMLElement;

    if (!container || !focusedElement) {
      if (this._renderTryCount > 10) return;
      setTimeout(() => {
        this._renderTryCount++;
        this.ensureVisibilityOfFocusedElement();
      }, 10);
      return;
    }

    const containerHeight = container.clientHeight;
    const elementTop = focusedElement.offsetTop;

    // Check if the element is fully visible
    if (
      elementTop - 50 < container.scrollTop ||
      elementTop + focusedElement.clientHeight + 50 >
        container.scrollTop + containerHeight
    ) {
      // If not, scroll the container
      container.scrollTop = elementTop - containerHeight / 2;
    }
  }

  public isEqual(ob1: any, ob2: any): boolean {
    return _.isEqual(ob1, ob2);
  }

  get selectedWorkload$(): BehaviorSubject<any> {
    return this._workloadService.selectedWorkload$;
  }

  get focusedWorkload(): any {
    return this._focusedWorkload;
  }

  get searchString$(): Observable<string | null> {
    return this._workloadService.filter$.pipe(map((filter) => filter.string));
  }

  get sortKey(): string {
    return this._sortKey;
  }

  get sortDirection(): 'asc' | 'desc' {
    return this._sortDirection;
  }
}

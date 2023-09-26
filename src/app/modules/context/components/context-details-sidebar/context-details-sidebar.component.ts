import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkloadService } from '@pq/context/services/workload.service';
import { fadeInOut } from '@pq/core/animations';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pq-context-details-sidebar',
  templateUrl: './context-details-sidebar.component.html',
  styleUrls: ['./context-details-sidebar.component.scss'],
  animations: [fadeInOut],
})
export class ContextDetailsSidebarComponent implements OnInit {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        event.preventDefault();
        this.focusPreviousResource();
      } else {
        event.preventDefault();
        this.focusNextResource();
      }
    }
  }

  private _filterVisible: boolean = false;

  constructor(private readonly _workloadService: WorkloadService) {}

  ngOnInit(): void {}

  private focusNextResource(): void {
    const resources = this._workloadService.availableResources$.value;
    const currentResource = this._workloadService.selectedResource$.value;

    if (resources.length > 0) {
      if (currentResource) {
        const index = resources.findIndex((w: any) => w === currentResource);
        if (index < resources.length - 1) {
          this._workloadService.selectedResource$.next(resources[index + 1]);
        } else {
          return;
        }
      } else {
        this._workloadService.selectedResource$.next(resources[0]);
      }
    }
  }

  private focusPreviousResource(): void {
    const resources = this._workloadService.availableResources$.value;
    const currentResource = this._workloadService.selectedResource$.value;

    if (resources.length > 0) {
      if (currentResource) {
        const index = resources.findIndex((w: any) => w === currentResource);
        if (index > 0) {
          this._workloadService.selectedResource$.next(resources[index - 1]);
        } else {
          return;
        }
      } else {
        this._workloadService.selectedResource$.next(resources[0]);
      }
    }
  }

  public toggleFilter(): void {
    this._filterVisible = !this._filterVisible;
  }

  get filterVisible(): boolean {
    return this._filterVisible;
  }

  get availableResources$(): any {
    return this._workloadService.availableResources$;
  }

  get currentFilter$(): BehaviorSubject<{
    namespace: string | null;
    string: string | null;
  }> {
    return this._workloadService.filter$;
  }
}

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
  handleKeyboardEvent(event: KeyboardEvent) {}

  private _filterVisible: boolean = false;

  constructor(private readonly _workloadService: WorkloadService) {}

  ngOnInit(): void {}

  public removeNamespaceFilter(): void {
    this._workloadService.filter$.next({
      namespace: null,
      string: this._workloadService.filter$.value.string,
    });
  }

  public removeStringFilter(): void {
    this._workloadService.filter$.next({
      namespace: this._workloadService.filter$.value.namespace,
      string: null,
    });
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

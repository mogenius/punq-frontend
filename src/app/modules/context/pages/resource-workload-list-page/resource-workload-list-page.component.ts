import { Component, OnInit } from '@angular/core';
import { WorkloadService } from '@pq/context/services/workload.service';
import { BehaviorSubject, filter, map, pairwise, startWith } from 'rxjs';

@Component({
  selector: 'pq-resource-workload-list-page',
  templateUrl: './resource-workload-list-page.component.html',
  styleUrls: ['./resource-workload-list-page.component.scss'],
})
export class ResourceWorkloadListPageComponent implements OnInit {
  constructor(private readonly _workloadService: WorkloadService) {}

  ngOnInit(): void {
    // CHECK FOR NAMESPACE FILTER CHANGES IF OPEN
    this._workloadService.filter$
      .pipe(
        map((filter) => filter.namespace),
        startWith(null),
        pairwise(),
        filter(([a, b]) => a !== b),
        map(([a, b]) => b)
      )
      .subscribe((namespace) => {
        this._workloadService
          .workloads(this._workloadService.selectedResource$.value)
          .subscribe((response: any) => {
            this._workloadService.currentWorkloads$.next(response);
          });
      });
  }

  get currentWorkloads$(): BehaviorSubject<any> {
    return this._workloadService.currentWorkloads$;
  }

  get selectedWorkload$(): BehaviorSubject<any> {
    return this._workloadService.selectedWorkload$;
  }

  get selectedResource$(): BehaviorSubject<any> {
    return this._workloadService.selectedResource$;
  }
}

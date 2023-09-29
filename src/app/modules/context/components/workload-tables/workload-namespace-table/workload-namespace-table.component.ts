import { Component, Input } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'pq-workload-namespace-table',
  templateUrl: './workload-namespace-table.component.html',
  styleUrls: ['./workload-namespace-table.component.scss'],
})
export class WorkloadNamespaceTableComponent extends WorkloadTableBase {
  get filteredWorkloads$(): Observable<any[]> {
    return this._workloadService.currentWorkloads$.pipe(
      map((workloads) => {
        return workloads.filter((workload: any) => {
          if (!this._workloadService.filter$.value.namespace) return workload;
          return;
        });
      })
    );
  }
}

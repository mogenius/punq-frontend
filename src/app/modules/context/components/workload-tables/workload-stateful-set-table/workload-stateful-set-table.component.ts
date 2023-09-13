import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-stateful-set-table',
  templateUrl: './workload-stateful-set-table.component.html',
  styleUrls: ['./workload-stateful-set-table.component.scss'],
})
export class WorkloadStatefulSetTableComponent extends WorkloadTableBase {}

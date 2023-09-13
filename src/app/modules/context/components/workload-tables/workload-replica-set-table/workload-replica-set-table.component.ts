import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-replica-set-table',
  templateUrl: './workload-replica-set-table.component.html',
  styleUrls: ['./workload-replica-set-table.component.scss'],
})
export class WorkloadReplicaSetTableComponent extends WorkloadTableBase {}

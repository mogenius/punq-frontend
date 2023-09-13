import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-cluster-role-table',
  templateUrl: './workload-cluster-role-table.component.html',
  styleUrls: ['./workload-cluster-role-table.component.scss'],
})
export class WorkloadClusterRoleTableComponent extends WorkloadTableBase {}

import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-cluster-role-binding-table',
  templateUrl: './workload-cluster-role-binding-table.component.html',
  styleUrls: ['./workload-cluster-role-binding-table.component.scss'],
})
export class WorkloadClusterRoleBindingTableComponent extends WorkloadTableBase {}

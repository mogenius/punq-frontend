import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-role-binding-table',
  templateUrl: './workload-role-binding-table.component.html',
  styleUrls: ['./workload-role-binding-table.component.scss'],
})
export class WorkloadRoleBindingTableComponent extends WorkloadTableBase {}

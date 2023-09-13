import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-role-table',
  templateUrl: './workload-role-table.component.html',
  styleUrls: ['./workload-role-table.component.scss'],
})
export class WorkloadRoleTableComponent extends WorkloadTableBase {}

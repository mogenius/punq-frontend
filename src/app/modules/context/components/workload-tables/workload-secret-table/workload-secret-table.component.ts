import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-secret-table',
  templateUrl: './workload-secret-table.component.html',
  styleUrls: ['./workload-secret-table.component.scss'],
})
export class WorkloadSecretTableComponent extends WorkloadTableBase {}

import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-job-table',
  templateUrl: './workload-job-table.component.html',
  styleUrls: ['./workload-job-table.component.scss'],
})
export class WorkloadJobTableComponent extends WorkloadTableBase {}

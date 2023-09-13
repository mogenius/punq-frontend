import { Component } from '@angular/core';
import { WorkloadTableBase } from '../workload-table-base';

@Component({
  selector: 'pq-workload-cron-job-table',
  templateUrl: './workload-cron-job-table.component.html',
  styleUrls: ['./workload-cron-job-table.component.scss'],
})
export class WorkloadCronJobTableComponent extends WorkloadTableBase {}

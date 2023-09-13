import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-cron-job-table-item]',
  templateUrl: './workload-cron-job-table-item.component.html',
  styleUrls: ['./workload-cron-job-table-item.component.scss'],
})
export class WorkloadCronJobTableItemComponent extends WorkloadTableItemBase {}

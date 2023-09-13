import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-job-table-item]',
  templateUrl: './workload-job-table-item.component.html',
  styleUrls: ['./workload-job-table-item.component.scss'],
})
export class WorkloadJobTableItemComponent extends WorkloadTableItemBase {}

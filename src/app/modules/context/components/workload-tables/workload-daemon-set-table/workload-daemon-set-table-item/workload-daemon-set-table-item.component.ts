import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-daemon-set-table-item]',
  templateUrl: './workload-daemon-set-table-item.component.html',
  styleUrls: ['./workload-daemon-set-table-item.component.scss'],
})
export class WorkloadDaemonSetTableItemComponent extends WorkloadTableItemBase {}

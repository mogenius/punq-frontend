import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-event-table-item]',
  templateUrl: './workload-event-table-item.component.html',
  styleUrls: ['./workload-event-table-item.component.scss'],
})
export class WorkloadEventTableItemComponent extends WorkloadTableItemBase {}

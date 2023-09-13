import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-orders-table-item]',
  templateUrl: './workload-orders-table-item.component.html',
  styleUrls: ['./workload-orders-table-item.component.scss'],
})
export class WorkloadOrdersTableItemComponent extends WorkloadTableItemBase {}

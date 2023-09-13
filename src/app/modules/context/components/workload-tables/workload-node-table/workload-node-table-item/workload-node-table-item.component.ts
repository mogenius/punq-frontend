import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-node-table-item]',
  templateUrl: './workload-node-table-item.component.html',
  styleUrls: ['./workload-node-table-item.component.scss'],
})
export class WorkloadNodeTableItemComponent extends WorkloadTableItemBase {}

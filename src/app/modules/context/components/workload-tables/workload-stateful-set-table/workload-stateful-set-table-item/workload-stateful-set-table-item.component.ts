import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-stateful-set-table-item]',
  templateUrl: './workload-stateful-set-table-item.component.html',
  styleUrls: ['./workload-stateful-set-table-item.component.scss'],
})
export class WorkloadStatefulSetTableItemComponent extends WorkloadTableItemBase {}

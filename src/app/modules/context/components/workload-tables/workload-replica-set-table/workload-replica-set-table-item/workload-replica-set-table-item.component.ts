import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-replica-set-table-item]',
  templateUrl: './workload-replica-set-table-item.component.html',
  styleUrls: ['./workload-replica-set-table-item.component.scss'],
})
export class WorkloadReplicaSetTableItemComponent extends WorkloadTableItemBase {}

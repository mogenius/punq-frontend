import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-pod-table-item]',
  templateUrl: './workload-pod-table-item.component.html',
  styleUrls: ['./workload-pod-table-item.component.scss'],
})
export class WorkloadPodTableItemComponent extends WorkloadTableItemBase {}

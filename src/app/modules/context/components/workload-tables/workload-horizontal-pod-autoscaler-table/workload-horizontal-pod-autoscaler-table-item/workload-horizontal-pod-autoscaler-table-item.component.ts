import { Component } from '@angular/core';
import { WorkloadTableItemBase } from '../../workload-table-item-base';

@Component({
  selector: '[pq-workload-horizontal-pod-autoscaler-table-item]',
  templateUrl: './workload-horizontal-pod-autoscaler-table-item.component.html',
  styleUrls: ['./workload-horizontal-pod-autoscaler-table-item.component.scss'],
})
export class WorkloadHorizontalPodAutoscalerTableItemComponent extends WorkloadTableItemBase {}
